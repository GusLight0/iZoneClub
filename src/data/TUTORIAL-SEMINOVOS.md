# Tutorial: produtos seminovos

Este guia explica onde cadastrar produtos seminovos e como manter essa seção separada dos produtos novos.

## Onde editar

Os produtos seminovos ficam em:

```txt
src/data/preOwned.ts
```

Hoje o arquivo está vazio de propósito:

```ts
export const preOwnedProducts: Product[] = [];
```

Quando houver seminovos, os produtos devem ser adicionados dentro desse array.

Importante: não apague a função `createPreOwnedProduct` que existe em `src/data/preOwned.ts`. Ela preenche automaticamente alguns campos técnicos para você não precisar repetir isso em todo seminovo.

## Onde aparece no site

Os produtos cadastrados em `preOwnedProducts` aparecem em:

```txt
/seminovos
```

Essa seção não mostra as categorias iPad, MacBook, Apple Watch e Acessórios como cards fixos. Ela fica vazia enquanto não houver produtos seminovos cadastrados.

## Imagens dos seminovos

Coloque as imagens em:

```txt
public/images/products/seminovos/
```

Se essa pasta ainda não existir, pode criar.

Exemplo de arquivo:

```txt
public/images/products/seminovos/iphone-14-pro-roxo-seminovo.jpeg
```

No produto, o caminho fica:

```ts
"/images/products/seminovos/iphone-14-pro-roxo-seminovo.jpeg"
```

Não coloque `public` no caminho usado dentro do código.

## Campos de um seminovo

Seminovos usam a função `createPreOwnedProduct(...)` para simplificar o cadastro:

```ts
createPreOwnedProduct({
  id: "iphone-14-pro-roxo-seminovo",
  slug: "iphone-14-pro-roxo-seminovo",
  name: "iPhone 14 Pro Seminovo",
  model: "14 Pro",
  shortDescription: "Aparelho seminovo revisado e pronto para uso.",
  description:
    "iPhone seminovo com disponibilidade limitada. Estado, bateria, garantia e detalhes devem ser confirmados no atendimento.",
  category: "iPhone",
  tags: ["iphone", "14 pro", "seminovo", "roxo"],
  colors: [
    {
      id: "roxo-profundo",
      name: "Roxo profundo",
      hex: "#62596E",
      images: ["/images/products/seminovos/iphone-14-pro-roxo-seminovo.jpeg"],
      variants: [
        { storage: "128GB", stock: 1, price: 3899 },
        { storage: "256GB", stock: 0, price: 4299 },
        { storage: "512GB", stock: 0, price: 4899 },
        { storage: "1TB", stock: 0, price: 5599 }
      ]
    }
  ]
})
```

O que cada campo faz:

- `id`: identificador interno. Use letras minúsculas, números e hífen.
- `slug`: endereço do produto. Exemplo: `/produto/iphone-14-pro-roxo-seminovo`.
- `name`: nome exibido no site.
- `model`: modelo usado como informação do produto.
- `shortDescription`: texto curto exibido no card.
- `description`: texto completo da página do produto.
- `category`: categoria do produto.
- `tags`: palavras que ajudam na busca e identificação.
- `colors`: cor, imagem, preço e estoque.

Alguns campos técnicos são colocados automaticamente por `createPreOwnedProduct`. Por isso, você não precisa preencher nada de destaque, selo de novo, confirmação de preço ou ordem padrão ao cadastrar um seminovo.

## Como cadastrar o primeiro seminovo

1. Abra `src/data/preOwned.ts`.
2. Troque isto:

```ts
export const preOwnedProducts: Product[] = [];
```

por isto:

```ts
export const preOwnedProducts: Product[] = [
  createPreOwnedProduct({
    id: "iphone-14-pro-roxo-seminovo",
    slug: "iphone-14-pro-roxo-seminovo",
    name: "iPhone 14 Pro Seminovo",
    model: "14 Pro",
    shortDescription: "Aparelho seminovo revisado e pronto para uso.",
    description:
      "iPhone seminovo com disponibilidade limitada. Estado, bateria, garantia e detalhes devem ser confirmados no atendimento.",
    category: "iPhone",
    tags: ["iphone", "14 pro", "seminovo", "roxo"],
    colors: [
      {
        id: "roxo-profundo",
        name: "Roxo profundo",
        hex: "#62596E",
        images: ["/images/products/seminovos/iphone-14-pro-roxo-seminovo.jpeg"],
        variants: [
          { storage: "128GB", stock: 1, price: 3899 },
          { storage: "256GB", stock: 0, price: 4299 },
          { storage: "512GB", stock: 0, price: 4899 },
          { storage: "1TB", stock: 0, price: 5599 }
        ]
      }
    ]
  })
];
```

3. Salve o arquivo.
4. Rode `npm.cmd test`.
5. Abra `/seminovos`.

## Como adicionar mais seminovos

Depois que já existir um produto no array, adicione outro objeto separado por vírgula:

```ts
export const preOwnedProducts: Product[] = [
  createPreOwnedProduct({
    id: "iphone-14-pro-roxo-seminovo",
    slug: "iphone-14-pro-roxo-seminovo",
    name: "iPhone 14 Pro Seminovo",
    model: "14 Pro",
    shortDescription: "Aparelho seminovo revisado e pronto para uso.",
    description:
      "iPhone seminovo com disponibilidade limitada. Estado, bateria, garantia e detalhes devem ser confirmados no atendimento.",
    category: "iPhone",
    tags: ["iphone", "14 pro", "seminovo", "roxo"],
    colors: [
      {
        id: "roxo-profundo",
        name: "Roxo profundo",
        hex: "#62596E",
        images: ["/images/products/seminovos/iphone-14-pro-roxo-seminovo.jpeg"],
        variants: [
          { storage: "128GB", stock: 1, price: 3899 },
          { storage: "256GB", stock: 0, price: 4299 },
          { storage: "512GB", stock: 0, price: 4899 },
          { storage: "1TB", stock: 0, price: 5599 }
        ]
      }
    ]
  }),
  createPreOwnedProduct({
    id: "iphone-13-rosa-seminovo",
    slug: "iphone-13-rosa-seminovo",
    name: "iPhone 13 Seminovo",
    model: "13",
    shortDescription: "Aparelho seminovo em rosa claro.",
    description:
      "iPhone 13 seminovo com detalhes de conservação e bateria a confirmar no atendimento.",
    category: "iPhone",
    tags: ["iphone", "13", "seminovo", "rosa"],
    colors: [
      {
        id: "rosa",
        name: "Rosa",
        hex: "#F8D9D4",
        images: ["/images/products/seminovos/iphone-13-rosa-seminovo.jpeg"],
        variants: [
          { storage: "128GB", stock: 1, price: 2499 },
          { storage: "256GB", stock: 0, price: 2899 },
          { storage: "512GB", stock: 0, price: 3499 },
          { storage: "1TB", stock: 0, price: 4299 }
        ]
      }
    ]
  })
];
```

## Como registrar estado do aparelho

Ainda não existe campo separado para estado de conservação ou saúde da bateria. Por enquanto, coloque essas informações em:

```ts
description
tags
```

Exemplo:

```ts
description:
  "iPhone seminovo com 89% de saúde da bateria, leves marcas de uso e caixa. Detalhes confirmados no atendimento.",
tags: ["iphone", "seminovo", "89 bateria", "caixa"]
```

## Como controlar estoque

Em seminovos, normalmente existe uma unidade por configuração. Use `stock: 1` para a opção disponível e `stock: 0` para as outras.

Exemplo:

```ts
variants: [
  { storage: "128GB", stock: 0, price: 0 },
  { storage: "256GB", stock: 1, price: 3199 },
  { storage: "512GB", stock: 0, price: 0 },
  { storage: "1TB", stock: 0, price: 0 }
]
```

Se não quiser exibir uma configuração, ainda assim mantenha as quatro opções para seguir o padrão atual do sistema.

## Como deixar um seminovo indisponível

Troque todos os estoques para zero:

```ts
variants: [
  { storage: "128GB", stock: 0, price: 3899 },
  { storage: "256GB", stock: 0, price: 4299 },
  { storage: "512GB", stock: 0, price: 4899 },
  { storage: "1TB", stock: 0, price: 5599 }
]
```

O produto pode aparecer como sem estoque. Se quiser tirar totalmente da seção, remova o objeto do array `preOwnedProducts`.

## Categorias em seminovos

Seminovos também aceitam as mesmas categorias técnicas:

```txt
iPhone
iPad
MacBook
Apple Watch
Acessórios
```

Mas a página `/seminovos` não mostra cards fixos dessas categorias. Ela apenas mostra os produtos que existirem no array `preOwnedProducts`.

## Página de detalhes

Todo seminovo cadastrado ganha página de detalhes em:

```txt
/produto/slug-do-produto
```

Exemplo:

```txt
/produto/iphone-14-pro-roxo-seminovo
```

Essa busca usa `src/data/catalog.ts`, que junta produtos novos e seminovos.

## Como testar depois de editar

Depois de salvar, rode:

```powershell
npm.cmd test
```

Para testar a build final:

```powershell
npm.cmd run build
```

Para abrir o site local:

```powershell
npm.cmd run dev
```

Depois acesse:

```txt
http://127.0.0.1:5173/seminovos
```

## Erros comuns

- Esquecer de importar o tipo `Product`.
- Repetir o mesmo `slug` de um produto novo.
- Usar `isNew: true` em seminovo.
- Esquecer vírgula entre produtos.
- Colocar imagem fora de `public/images/products/`.
- Usar caminho de imagem começando com `public/`.
- Deixar `variants` vazio.
- Colocar estoque como texto, exemplo `"1"` em vez de `1`.

## Checklist rápido

- Imagem em `public/images/products/seminovos/`.
- Produto dentro de `preOwnedProducts`.
- `id` único.
- `slug` único.
- Estoque correto.
- Estado do aparelho explicado na `description`.
- `npm.cmd test` passando.
