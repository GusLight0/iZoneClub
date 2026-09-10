# iZone Club

## Painel administrativo

O painel de produtos fica em `/admin`. Configuração, SQLs, importação do catálogo e ativação no Netlify estão em [PAINEL-ADMIN-PASSO-A-PASSO.md](PAINEL-ADMIN-PASSO-A-PASSO.md).

Com `VITE_CATALOG_SOURCE=supabase`, os produtos são editados pelo painel. Sem essa ativação, a loja continua usando os arquivos locais descritos abaixo.

E-commerce front-end em React, TypeScript, Vite e Tailwind CSS para venda de produtos Apple com carrinho em `localStorage` e finalização pelo WhatsApp.

## Como executar

```bash
npm install
npm run dev
```

## Como gerar build

```bash
npm run build
```

## Onde editar produtos

Todos os produtos ficam em:

```text
src/data/products.ts
```

Para cadastrar um novo produto, adicione um novo objeto dentro do array `products`. Não é preciso criar novo componente, nova página ou novo filtro.

## Como adicionar um produto

Copie um produto existente em `src/data/products.ts`, troque:

- `id`
- `slug`
- `name`
- `model`
- descrições
- `releaseOrder`
- `tags`
- `colors`

O `slug` vira a URL do produto, por exemplo:

```text
/produto/iphone-16-pro
```

## Como remover um produto

Remova o objeto do produto no array `products`.

## Como alterar preço

Em cada cor, os preços ficam nas variantes geradas por:

```ts
color("verde-claro", "Verde claro", "#CDE7E2", "/images/products/iphone-16.jpeg", 5799, [5, 3, 2, 1])
```

O número `5799` é o preço base do `128GB`. O sistema soma automaticamente os adicionais para `256GB`, `512GB` e `1TB`.

## Como marcar preço como estimado

No produto, use:

```ts
priceIsEstimated: true
```

Quando o preço for final, altere para:

```ts
priceIsEstimated: false
```

## Como adicionar uma cor

Adicione outra chamada `color(...)` dentro de `colors`.

```ts
colors: [
  color("branco", "Branco", "#F7F8F8", "/images/products/iphone-17.jpeg", 7899, [4, 3, 2, 1]),
  color("azul", "Azul", "#8FB5D8", "/images/products/iphone-17-azul.jpeg", 7999, [2, 2, 1, 0])
]
```

Use apenas cores que tenham imagem real correspondente.

## Como colocar imagens diferentes por cor

Cada cor tem um campo `images`. Hoje os produtos usam uma imagem por cor, mas você pode incluir mais:

```ts
images: [
  "/images/products/iphone-17-azul-01.jpeg",
  "/images/products/iphone-17-azul-02.jpeg"
]
```

## Como alterar armazenamento

As opções atuais estão em:

```ts
const STORAGE_OPTIONS: StorageOption[] = ["128GB", "256GB", "512GB", "1TB"];
```

## Como alterar estoque

O último argumento de `color(...)` representa o estoque nesta ordem:

```text
[128GB, 256GB, 512GB, 1TB]
```

Exemplo:

```ts
[5, 3, 2, 1]
```

## Como marcar produto como destaque

No produto, use:

```ts
featured: true
```

Para marcar como novidade:

```ts
isNew: true
```

## Como adicionar imagens na pasta

Coloque as imagens servidas pelo site em:

```text
public/images/products/
```

Depois referencie o caminho assim:

```ts
"/images/products/nome-do-arquivo.jpeg"
```

As imagens originais também podem ficar organizadas em `assets/celulares`.

## Como alterar o WhatsApp

Edite:

```text
src/utils/whatsapp.ts
```

Troque:

```ts
WHATSAPP_PHONE
WHATSAPP_DISPLAY
```

## Como alterar o e-mail

No mesmo arquivo:

```text
src/utils/whatsapp.ts
```

Troque:

```ts
CONTACT_EMAIL
```

## Hospedagem

O arquivo `public/_redirects` já está pronto para Netlify. Em Vercel, o roteamento da SPA funciona normalmente com configuração padrão do Vite.
