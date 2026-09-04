# Tutorial: seções de produtos

As categorias não ficam mais dentro dos filtros de produtos novos. Cada tipo de produto tem uma seção própria:

```txt
/iphones
/ipads
/macbooks
/apple-watch
/acessorios
/seminovos
```

## Onde ficam os produtos

Produtos novos ficam em:

```txt
src/data/products.ts
```

Dentro desse arquivo existe um array para cada seção:

```ts
iphoneProducts
ipadProducts
macBookProducts
appleWatchProducts
accessoryProducts
```

Seminovos ficam em:

```txt
src/data/preOwned.ts
```

Dentro dele, edite:

```ts
preOwnedProducts
```

## Onde ficam nomes e rotas das seções

As seções aparecem em:

```txt
src/data/productSections.ts
```

Edite esse arquivo se quiser mudar nome, rota, descrição, ordem ou ícone de uma seção.

## Como editar um produto existente

1. Abra o arquivo da seção:
   - novos: `src/data/products.ts`
   - seminovos: `src/data/preOwned.ts`
2. Encontre o produto pelo `id`, `slug` ou `name`.
3. Troque textos, preço, estoque, cor ou imagem.
4. Salve.
5. Rode:

```powershell
npm.cmd test
```

Campos mais comuns:

```ts
name: "Nome que aparece no site"
shortDescription: "Texto curto do card"
description: "Texto completo da página do produto"
priceIsEstimated: true
tags: ["palavras", "de", "busca"]
```

## Como adicionar produto em uma seção

Copie um produto parecido e cole dentro do array certo.

Exemplo para iPad:

```ts
export const ipadProducts: Product[] = [
  {
    id: "ipad-air-11-m4-azul",
    slug: "ipad-air-11-m4-azul",
    name: "iPad Air 11 M4",
    model: "Air 11",
    shortDescription: "Texto curto para o card.",
    description: "Texto completo para a página do produto.",
    category: "iPad",
    variantLabel: "Armazenamento",
    featured: true,
    isNew: true,
    priceIsEstimated: true,
    releaseOrder: 2026.5,
    tags: ["ipad", "air", "m4"],
    colors: [
      color("azul", "Azul", "#A9C8D8", "/images/products/ipad-air.jpeg", [
        variant("128GB", 5799, 1),
        variant("256GB", 6499, 1)
      ])
    ]
  }
];
```

Regras importantes:

- `id` e `slug` não podem repetir.
- `category` precisa combinar com a seção.
- Produto novo usa `isNew: true`.
- Seminovo usa `createPreOwnedProduct(...)` em `src/data/preOwned.ts`.
- `releaseOrder` maior aparece antes em novidades.
- `stock: 0` deixa a opção sem estoque.

## Como remover produto

Apague o objeto inteiro do array da seção.

Exemplo:

```ts
export const accessoryProducts: Product[] = [
  {
    id: "adaptador-usb-c-70w",
    ...
  }
];
```

Para remover, delete desde `{` até `}`. Se houver outro produto depois, ajuste a vírgula entre os objetos.

Se o array ficar vazio, deixe assim:

```ts
export const accessoryProducts: Product[] = [];
```

A página da seção continua existindo e mostra um estado vazio.

## Como editar imagens

Você pode usar imagem local ou URL da internet.

Imagem local:

```txt
public/images/products/produto.jpeg
```

No produto:

```ts
"/images/products/produto.jpeg"
```

URL da internet:

```ts
"https://exemplo.com/imagem-do-produto.jpg"
```

Não coloque `public` no caminho usado dentro do código.

## Como deixar imagem em retrato 3:4

Nos produtos que precisam aparecer com foto vertical, adicione este campo:

```ts
imageAspectRatio: "portrait-3-4"
```

Exemplo:

```ts
category: "iPad",
variantLabel: "Armazenamento",
imageAspectRatio: "portrait-3-4",
featured: false
```

Os iPhones cadastrados não usam esse campo, então continuam no formato padrão.

## Como funcionam opções, tamanhos e armazenamento

Cada produto pode mudar o nome da opção exibida:

```ts
variantLabel: "Armazenamento"
variantLabel: "Configuração"
variantLabel: "Tamanho"
variantLabel: "Opção"
```

Cada variante pode ter um rótulo próprio:

```ts
variant("128GB", 599, 1, "Única")
variant("128GB", 3999, 1, "42mm")
variant("256GB", 9999, 1, "256GB SSD")
```

O primeiro valor ainda usa os códigos técnicos aceitos pelo sistema:

```txt
128GB
256GB
512GB
1TB
```

O texto exibido no site usa o último argumento quando ele existir.

## Como adicionar seminovo

Em `src/data/preOwned.ts`, adicione dentro de `preOwnedProducts`:

```ts
createPreOwnedProduct({
  id: "iphone-14-pro-256gb-seminovo",
  slug: "iphone-14-pro-256gb-seminovo",
  name: "iPhone 14 Pro Seminovo",
  model: "14 Pro",
  shortDescription: "Aparelho seminovo revisado.",
  description:
    "Estado, saúde da bateria, garantia e acessórios inclusos devem ser confirmados no atendimento.",
  category: "iPhone",
  variantLabel: "Armazenamento",
  tags: ["iphone", "14 pro", "seminovo"],
  colors: [
    {
      id: "gold",
      name: "Gold",
      hex: "#F4E0B9",
      images: ["/images/products/seminovos/iphone-14-pro.jpeg"],
      variants: [{ storage: "256GB", stock: 1, price: 3899 }]
    }
  ]
})
```

## Como testar

Depois de editar:

```powershell
npm.cmd test
npm.cmd run build
```

Para abrir local:

```powershell
npm.cmd run dev
```

Rotas principais:

```txt
http://127.0.0.1:5173/iphones
http://127.0.0.1:5173/ipads
http://127.0.0.1:5173/macbooks
http://127.0.0.1:5173/apple-watch
http://127.0.0.1:5173/acessorios
http://127.0.0.1:5173/seminovos
```
