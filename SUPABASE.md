# Conduta · Guia de setup do Supabase

Tudo que precisa ser feito **uma vez** no painel do Supabase para o app
funcionar completo: banco (percentil + liga) e entrada de usuários
(Google, email/senha e magic link).

Projeto: `mxsraulcvabarpaxealh` · https://supabase.com/dashboard/project/mxsraulcvabarpaxealh

---

## 1. Banco de dados (5 min)

1. Abra **SQL Editor** no painel.
2. Cole o conteúdo **inteiro** de [`schema.sql`](schema.sql) e clique **Run**.
3. Pronto. O arquivo é **idempotente**: pode rodar de novo no futuro sem
   quebrar nada (blocos já aplicados são pulados, policies antigas são
   substituídas pelas novas).

O que ele cria:

| Bloco | Objetos | Para quê |
|---|---|---|
| 1 | `user_progress` + RLS | progresso do jogador **logado** (streak, XP, histórico sincronizados entre dispositivos) |
| 2 | `daily_results` + RPC `daily_percentile` | percentil do caso do dia ("Top 18% de hoje"), **sem login** |
| 3 | `profiles` + RPCs `upsert_profile`, `get_profile`, `find_profile_by_handle` | **perfil do jogador**: nome editável salvo na plataforma, handle único opcional e `public_id` (a base para "adicionar amigos" no futuro) |
| 4 | `league_groups`, `league_members` + RPCs `league_group_info`, `league_leaderboard`, `league_leave`, `league_my_groups` | liga com amigos por código de convite; ranking usa o nome do perfil |

### Verificação rápida (cole no SQL Editor)

```sql
-- deve listar as 5 tabelas
select table_name from information_schema.tables
where table_schema = 'public'
  and table_name in ('user_progress','daily_results','profiles','league_groups','league_members');

-- deve retornar {"total":0,"below":0}
select daily_percentile('2099-01-01', 50);

-- deve retornar NULL (código inexistente, sem erro)
select league_group_info('XXXXXX');

-- cria e lê um perfil de teste (depois pode apagar)
select upsert_profile('00000000-0000-4000-8000-000000000001', 'Teste', 'teste_conduta');
select find_profile_by_handle('teste_conduta');
delete from profiles where client_id = '00000000-0000-4000-8000-000000000001';
```

E no app: jogue o caso do dia → a linha do percentil deve mostrar
"Você e mais N pessoas jogaram hoje" (ou o percentil, quando N ≥ 25).
No **Perfil**, editar o nome deve salvá-lo na plataforma (tabela
`profiles`). Na aba **Liga**, criar um grupo deve gerar um código de
6 letras — e o nome que aparece no ranking passa a ser o do perfil.

---

## 2. Entrada de usuários (Authentication)

O app funciona **sem login** — a conta serve só pra sincronizar streak/
histórico entre dispositivos. Três métodos, todos já implementados no
cliente (`auth.js`); falta só ativar no painel:

### 2.1 Email + senha e magic link (2 min)

**Authentication → Sign In / Up → Email**: deixe **habilitado**.

- "Email + senha" e "magic link" usam o mesmo provider — nada mais a fazer.
- Opcional: em **Authentication → Emails** personalize os templates
  (Magic Link e Confirm signup) — hoje vão com o texto padrão do Supabase.
- Opcional (recomendado): **Confirm email = ON** para bloquear cadastros
  com emails de terceiros.

### 2.2 Google OAuth (10 min)

1. No [Google Cloud Console](https://console.cloud.google.com/apis/credentials):
   crie um projeto (ou use um existente) → **Create Credentials →
   OAuth client ID → Web application**.
2. Em **Authorized redirect URIs**, adicione exatamente:
   ```
   https://mxsraulcvabarpaxealh.supabase.co/auth/v1/callback
   ```
3. Copie o **Client ID** e o **Client Secret**.
4. No Supabase: **Authentication → Sign In / Up → Google** → habilite e
   cole os dois valores.

### 2.3 URLs de redirecionamento (obrigatório — 2 min)

Sem isso o login volta para o lugar errado (ou falha com
"redirect_to not allowed"):

**Authentication → URL Configuration**:
- **Site URL**: `https://conduta.cc`
- **Redirect URLs** (adicionar):
  - `https://conduta.cc/**`
  - `http://localhost:8080/**` (desenvolvimento)

### Verificação rápida

1. Abra o app → **entrar** → "Entrar com Google" → deve voltar logado
   (avatar com a inicial no header).
2. Ao logar, as chaves `conduta_*` do localStorage migram para
   `user_progress` (confira em **Table Editor → user_progress**).
3. Magic link: enviar → clicar no email → volta logado.

---

## 3. Modelo de segurança (o que a anon key pode fazer)

A anon key é pública por natureza (vai no HTML). O desenho limita o que
ela alcança:

| Recurso | Pode | Não pode |
|---|---|---|
| `user_progress` | nada sem login; logado, só as **próprias** linhas (RLS por `auth.uid()`) | ler/escrever dados de outros usuários |
| `daily_results` | inserir 1 resultado **do dia corrente** por dispositivo (`UNIQUE(client_id, day_key)` + CHECK de data) | ler linhas cruas, reescrever resultados, inserir dias passados/futuros |
| `profiles` | criar/editar o **próprio** perfil via RPC validada (precisa do próprio `client_id`); buscar terceiros **por handle exato** (devolve só nome, handle e `public_id`) | ler/listar a tabela, editar perfil alheio, descobrir o `client_id` de alguém |
| Liga | criar grupo, entrar com código, sair (só a própria linha, via `league_leave`), ler **agregados** via RPC | listar grupos/códigos (o código é o segredo), ler membros, renomear/remover terceiros |
| `client_id` alheio | — | nenhuma RPC devolve client_id de ninguém (o "você" do ranking é calculado no servidor), então não há como forjar resultado nem editar perfil em nome de outro membro |

**Limitações aceitas no v1** (documentadas, não bugs):
- Spam de inserts com client_ids inventados pode inflar o `total` do
  percentil. Mitigação atual: UNIQUE + CHECK de data. Se virar problema,
  mover o insert para uma Edge Function com verificação adicional.
- Qualquer pessoa com a anon key pode criar grupos vazios. Inofensivo;
  limpar com `delete from league_groups where created_at < now() - interval '90 days' and code not in (select group_code from league_members)`.
- O streak/XP local pode ser editado no próprio dispositivo (localStorage).
  É um jogo — quem quer se enganar, consegue. O ranking usa `daily_results`,
  que tem as travas acima.

---

## 4. Troubleshooting

| Sintoma | Causa provável | Correção |
|---|---|---|
| Percentil sempre "indisponível" | bloco 2 do SQL não rodou | rodar `schema.sql` (seção 1 deste guia) |
| "Não deu: grupo não encontrado" ao entrar num grupo que existe | bloco 4 antigo (sem `league_group_info`) | rodar `schema.sql` de novo — ele substitui as versões antigas |
| Nome editado no Perfil não aparece no ranking da liga | bloco 3 (`profiles`) não rodou, ou o SQL antigo (leaderboard sem JOIN em profiles) | rodar `schema.sql` completo |
| Login Google abre e volta deslogado | redirect URI errada no Google Cloud | conferir a URI exata da seção 2.2 |
| Magic link leva pra página errada | URL Configuration | seção 2.3 |
| Erro `function league_leaderboard(text,text,text) does not exist` no console | app novo + SQL antigo | rodar `schema.sql` (a assinatura nova tem `p_client`) |
| "esse handle já está em uso" | handle é único global | escolher outro handle (3–20 caracteres: a–z, 0–9, _) |
| Erro ao rodar o SQL: `column m.group_code does not exist` (ou coluna parecida em `league_*`) | tabela de liga criada por uma versão anterior, sem as colunas novas (o `CREATE TABLE IF NOT EXISTS` não altera tabela existente) | rodar de novo o `schema.sql` atual — ele tem `ALTER TABLE … ADD COLUMN IF NOT EXISTS` que auto-cura |
| Ao criar/entrar em liga: `null value in column "league_id" … violates not-null constraint`, ou `cannot drop column league_id … because other objects depend on it` | tabela `league_members` de um **modelo antigo** (usava `league_id` + policies próprias), incompatível com o atual (`group_code`) | **caminho garantido** (dados de liga são só de teste): rode PRIMEIRO os dois drops abaixo e SÓ DEPOIS o `schema.sql` inteiro. O `DROP TABLE … CASCADE` remove tabela, policies, colunas e constraints de uma vez — sem remendo coluna a coluna |
