# Painel administrativo da iZone Club

## O que já está implementado

- Página `/admin` com login por e-mail/senha, verificação de administrador e logout.
- Lista pesquisável de produtos, filtros, cadastro, edição e publicação/ocultação.
- Produtos novos e seminovos, nome, modelo, categoria, descrições, busca e destaques.
- Opções configuráveis por produto: cor, armazenamento, RAM, tamanho ou outro atributo. A categoria sugere opções, mas não as obriga.
- Produto sem variações: uma única linha com preço e estoque, sem seletores artificiais na loja.
- Preço e estoque por combinação realmente cadastrada; combinações duplicadas são rejeitadas.
- Fotos gerais ou por cor, ordenação, remoção do cadastro e otimização para até 1600 pixels no maior lado.
- Proporções 1:1, 3:4 e 4:3, mais o padrão legado. As proporções explícitas exibem fotos inteiras, sem distorcer. Os cards reservam uma área comum para alinhar títulos e botões.
- Importação dos 36 produtos locais, sem sobrescrever produtos existentes, e exportação JSON do banco.
- Integração de início, categorias, busca, favoritos, produto e carrinho com o catálogo remoto.
- Consulta de preço e estoque antes de encaminhar o pedido ao WhatsApp. Alterações de preço exigem nova conferência; produtos/opções indisponíveis impedem o envio.

O código está preparado. Para ativar no seu banco, execute os SQLs 002 e 003 após o 001, entre no painel e importe/confira os produtos seguindo as etapas abaixo. Depois da importação, o SQL 004 pode padronizar estoque 20 nos itens disponíveis. O build, os testes locais e a API simulada não substituem o teste final com seu usuário Supabase.

## 1. Configuração já realizada

Os pacotes Supabase foram instalados. Os valores que você preencheu foram copiados para `.env.local`, ignorado pelo Git. `.env.example` contém somente exemplos.

```dotenv
VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_SUA_CHAVE
VITE_CATALOG_SOURCE=local
```

Use somente a chave **publishable**. Nunca coloque a senha do banco, `service_role` ou `sb_secret_...` em `VITE_*`, pois essas variáveis são incluídas no site público. Não compartilhe sua senha aqui.

O administrador definido é **ga2685002@gmail.com**, cadastrado em Authentication → Users.

## 2. Executar os SQLs

Você já informou que executou `supabase/001_catalogo_admin.sql`. A tabela de produtos está acessível.

Agora execute **`supabase/002_salvar_produto.sql`**:

1. Abra o arquivo no VS Code.
2. Use Ctrl+A e Ctrl+C para copiar tudo.
3. No projeto correto do Supabase, abra SQL Editor → New query.
4. Cole o conteúdo, tire qualquer seleção de texto e clique em Run.
5. Aguarde a confirmação de sucesso. “Success. No rows returned” também é normal.

Esse segundo arquivo permite salvar produto, variações e fotos juntos, sem deixar o cadastro incompleto se uma etapa falhar. Também impede sobrescrever silenciosamente uma edição mais recente feita em outra sessão.

Depois execute **`supabase/003_ordem_decimal.sql`** da mesma forma. Ele corrige o tipo da ordem de novidade em bancos criados com o primeiro SQL original, permitindo valores como `16.3` e `17.3`, sem apagar produtos. Se a importação apresentou `invalid input syntax for type integer: "16.3"`, execute somente o 003 e repita a importação: os produtos já importados serão preservados. Não é preciso arredondar valores nem refazer o banco.

Os três primeiros SQLs podem ser executados novamente. Se a mensagem indicar que o usuário não existe, crie o e-mail acima em Authentication → Users → Add user e execute o primeiro arquivo novamente.

## 3. Abrir o painel local

No terminal do projeto:

```bash
npm run dev
```

Abra a URL que o Vite informar, acrescentando `/admin`. Normalmente é `http://localhost:5173/admin`.

Entre com **ga2685002@gmail.com** e a senha criada para esse usuário no Supabase. Essa é a senha do usuário, não a senha do banco.

O painel pode funcionar mesmo enquanto a loja permanece no catálogo local. A mensagem de catálogo local é esperada nesta fase.

## 4. Importar o catálogo atual

1. No painel, abra **Importar catálogo atual e exportar cópia**.
2. Confira os preços atuais da loja, especialmente os valores indicados como “Custo” no seu documento de produtos. O importador usa os preços presentes no código da loja; não interpreta o Markdown como uma tabela de preços de venda.
3. Marque a confirmação e clique em **Importar produtos atuais**.
4. Aguarde a conclusão. Você pode repetir a importação após uma falha: IDs já existentes são preservados.
5. Se quiser todos os itens disponíveis com 20 unidades, execute **`supabase/004_estoque_padrao_20.sql`** no SQL Editor. Ele altera somente variações com estoque maior que zero.
6. Abra alguns produtos e confira condição, cores, opções, preço, estoque e fotos.

Os links e IDs dos produtos são preservados. Itens de carrinhos antigos que tenham identificadores de variação do catálogo local podem precisar ser removidos e adicionados novamente após a migração.

## 5. Usar o formulário

**Acessório sem opções:** deixe uma linha com preço e estoque; não adicione armazenamento nem cor se não existirem.

**iPhone com opções:** adicione Cor e Armazenamento, e crie apenas as combinações vendidas. Exemplo: Preto + 128GB, preço R$ 3.000, estoque 2; Preto + 256GB, preço R$ 3.500, estoque 1.

**Mac:** adicione RAM e Armazenamento; Cor somente se aplicável. A loja mostra as configurações combinadas para o cliente escolher.

**Apple Watch:** adicione Tamanho e Cor conforme necessário.

Você pode adicionar outro atributo pelo campo **Outra opção**. Remover uma opção não soma estoques automaticamente: ajuste eventuais linhas duplicadas antes de salvar. Se renomear uma cor, revise também as fotos vinculadas a ela.

**Fotos:** selecione JPEG, PNG ou WebP. O navegador otimiza as fotos antes do envio. Use as setas para ordenar, escolha a cor da foto e selecione 1:1, 3:4 ou 4:3. As fotos novas são enviadas ao Supabase ao salvar. A prévia ajuda a conferir a proporção; a apresentação completa deve ser conferida também na loja.

**Ocultar:** desmarque Publicado na loja e salve. O cadastro permanece disponível no painel.

## 6. Ativar o catálogo remoto localmente

Somente depois de importar e conferir, adicione ou altere esta linha em `.env.local`:

```dotenv
VITE_CATALOG_SOURCE=supabase
```

Pare o Vite com Ctrl+C e execute `npm run dev` novamente. Abra a loja e confira os produtos. Sem essa variável, a loja usa o catálogo dos arquivos locais.

Com o catálogo remoto ativo, um banco vazio mostra uma loja sem produtos. Uma falha na consulta exibe erro e opção de tentar novamente, sem substituir silenciosamente os dados por preços antigos. A loja consulta novamente ao recuperar o foco da janela; atualize a página para conferir uma edição feita em outro dispositivo.

## 7. Teste final com seu banco

1. Entre no `/admin`, altere o preço e estoque de um produto e salve.
2. Abra a loja em janela anônima e confirme a alteração.
3. Teste produto sem variações e produto com combinações diferentes.
4. Envie uma foto, escolha a proporção e confira no celular e computador.
5. Oculte um produto e confira que não aparece no catálogo nem no link direto em janela anônima.
6. Coloque um produto no carrinho, altere seu preço no painel e tente finalizar: a loja deve pedir que você confira o novo valor.
7. Zere o estoque e confira o bloqueio de compra daquela opção.
8. Saia do painel e confirme que é necessário entrar novamente para editar.
9. No Supabase Authentication → Sign In / Providers, mantenha o login por e-mail e desative novos cadastros públicos. A lista de administradores continua sendo a autorização efetiva para editar.
10. Execute `npm run build` antes de publicar.

O estoque é manual nesta versão. Enviar uma mensagem no WhatsApp não reserva nem baixa unidades; o lojista atualiza o estoque quando confirmar a venda.

## 8. Publicar no Netlify

Após os testes acima:

1. Abra o projeto correto no Netlify.
2. Em Project configuration → Environment variables, configure `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` e **`VITE_CATALOG_SOURCE=supabase`**, usando o projeto Supabase conferido.
3. Build command: **`npm run build`**. Publish directory: **`dist`**.
4. Publique a versão atual do código. Se você publica manualmente, gere um novo build local com as variáveis corretas e envie a pasta `dist`.
5. Abra `https://izone.club/admin` e uma URL de produto diretamente. O arquivo `public/_redirects` dá suporte às rotas da aplicação.
6. Repita um teste de edição, imagem e estoque no domínio real.

Alterar `VITE_*` exige novo build. Editar produtos pelo painel, após a ativação, não exige deploy. Não configure gatilhos de deploy por edição de produto.

## Manutenção e limites

- Acompanhe Usage & billing no Netlify e armazenamento/tráfego no Supabase. Banco externo reduz a necessidade de deploy, mas não elimina o consumo do site nem as cotas do Supabase.
- Fotos no bucket `product-images` são públicas por URL. Ocultar um produto não torna um arquivo já publicado privado.
- Remover uma foto do cadastro remove sua referência no produto. O arquivo remoto é mantido para não apagar fotos ainda utilizadas ou perder cópias; revise arquivos sem uso no Storage periodicamente. Uploads concluídos antes de um salvamento cancelado/falho também podem precisar dessa limpeza.
- Exporte o catálogo em JSON periodicamente e mantenha uma cópia separada dos arquivos de fotos. Não há restauração automática pela interface nesta versão.
- Recuperação de senha por e-mail ainda não está implementada na interface. O responsável pelo Supabase deve administrar o acesso e eventual recuperação.
- Banners, textos institucionais e layout geral não são editados por este painel de produtos.

## Verificação técnica

- `npm run test`: verificação TypeScript.
- `node tests/run-admin-data.mjs`: conversão dos produtos locais, variantes, proporções e validação de checkout.
- Para os testes isolados adicionais: `npm install --prefix .tmp/admin-check --no-save @playwright/test @electric-sql/pglite`.
- `node tests/admin-sql.mjs`: SQL em PostgreSQL isolado (PGlite), verificando repetição das migrações, permissões, conflitos e reversão de salvamento inválido.
- `tests/admin-browser.mjs`: teste com API simulada e Edge headless. Use um Vite separado na porta 5174, modo `admincheck`, com URL Supabase `http://localhost:54321`, chave pública fictícia e catálogo remoto. Não use dados reais nesse ambiente de teste.

## Referências oficiais

- Chaves Supabase: https://supabase.com/docs/guides/getting-started/api-keys
- React: https://supabase.com/docs/guides/getting-started/quickstarts/reactjs
- Autenticação: https://supabase.com/docs/guides/auth/general-configuration
- Permissões de arquivos: https://supabase.com/docs/guides/storage/security/access-control
- Planos Supabase: https://supabase.com/pricing
- Créditos Netlify: https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work/
