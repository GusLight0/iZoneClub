# Tutorial: produtos novos

Este guia explica onde editar os produtos novos da loja e como cadastrar iPhone, iPad, MacBook, Apple Watch e acessórios.

## Onde editar

Os produtos novos ficam em:

```txt
src/data/products.ts
```

As categorias que aparecem no filtro do catálogo de produtos novos ficam em:

```txt
src/data/productCategories.ts
```

As imagens usadas pelos produtos devem ficar em:

```txt
public/images/products/
```

Exemplo: se a imagem estiver em `public/images/products/iphone-17.jpeg`, no produto você usa:

```ts
"/images/products/iphone-17.jpeg"
```

Não coloque `public` no caminho da imagem dentro do código.

## Onde aparece no site

Os produtos cadastrados em `src/data/products.ts` aparecem em:

```txt
/iphones
```

Apesar do endereço ainda se chamar `/iphones`, essa é a seção de produtos novos. As categorias ficam dentro dos filtros e já aceitam:

```txt
iPhone
iPad
MacBook
Apple Watch
Acessórios
```

## Antes de cadastrar um produto

Confira estes pontos:

- A imagem já está dentro de `public/images/products/`.
- O `id` e o `slug` não existem em outro produto.
- A `category` está escrita exatamente como uma das categorias aceitas.
- Cada produto tem pelo menos uma cor em `colors`.
- Cada cor tem estoque e preço por armazenamento.

## Categorias aceitas

As categorias aceitas estão em `src/types/product.ts`:

```ts
"iPhone" | "iPad" | "MacBook" | "Apple Watch" | "Acessórios"
```

Use exatamente esses nomes, incluindo acentos e letras maiúsculas.

Exemplos:

```ts
category: "iPhone"
category: "iPad"
category: "MacBook"
category: "Apple Watch"
category: "Acessórios"
```

## Como funciona o preço e estoque

No topo de `src/data/products.ts`, existem estes armazenamentos:

```ts
const STORAGE_OPTIONS: StorageOption[] = ["128GB", "256GB", "512GB", "1TB"];
```

Cada cor usa esta função:

```ts
color(id, nomeDaCor, corEmHex, imagem, precoBase, estoques)
```

Exemplo:

```ts
color("preto", "Preto", "#1F2937", "/images/products/iphone-16-preto.jpeg", 5799, [2, 1, 0, 0])
```

Neste exemplo:

- `5799` é o preço do modelo de 128GB.
- `[2, 1, 0, 0]` é o estoque na ordem `128GB`, `256GB`, `512GB`, `1TB`.
- O produto tem 2 unidades de 128GB.
- O produto tem 1 unidade de 256GB.
- O produto não tem estoque de 512GB.
- O produto não tem estoque de 1TB.

O sistema calcula os preços maiores automaticamente com estes acréscimos:

```ts
128GB = preço base
256GB = preço base + 500
512GB = preço base + 1100
1TB   = preço base + 1900
```

Para mudar essa regra, edite `priceSteps` dentro da função `variants`.

## Campos de um produto

Cada produto dentro de `products` segue este formato:

```ts
{
  id: "iphone-16-preto",
  slug: "iphone-16-preto",
  name: "iPhone 16",
  model: "16",
  shortDescription: "Texto curto para o card do produto.",
  description: "Texto maior para a página de detalhes.",
  category: "iPhone",
  featured: true,
  isNew: true,
  priceIsEstimated: true,
  releaseOrder: 16,
  tags: ["iphone", "16", "preto"],
  colors: [
    color("preto", "Preto", "#1F2937", "/images/products/iphone-16-preto.jpeg", 5799, [2, 1, 0, 0])
  ]
}
```

O que cada campo faz:

- `id`: identificador interno. Use letras minúsculas, números e hífen.
- `slug`: endereço do produto. Exemplo: `/produto/iphone-16-preto`.
- `name`: nome exibido no site.
- `model`: modelo usado nos filtros. Exemplo: `"16"`, `"16 Pro"`, `"Air 13"`, `"Series 10"`.
- `shortDescription`: texto curto exibido nos cards.
- `description`: texto completo exibido na página do produto.
- `category`: categoria do produto novo.
- `featured`: `true` coloca o produto nos destaques da home.
- `isNew`: `true` mostra o selo "Novo".
- `priceIsEstimated`: `true` mostra que o valor deve ser confirmado no atendimento.
- `releaseOrder`: número usado para ordenar novidades. Quanto maior, mais acima.
- `tags`: palavras que ajudam na busca.
- `colors`: lista de cores, imagens, preços e estoques.

## Como adicionar um novo iPhone

1. Coloque a imagem em `public/images/products/`.
2. Abra `src/data/products.ts`.
3. Copie um produto parecido.
4. Cole antes do fechamento do array `products`.
5. Troque `id`, `slug`, `name`, `model`, textos, preço, estoque, imagem e tags.
6. Salve e rode `npm.cmd test`.

Exemplo:

```ts
{
  id: "iphone-16-preto",
  slug: "iphone-16-preto",
  name: "iPhone 16",
  model: "16",
  shortDescription: "Design leve, tela vibrante e acabamento preto.",
  description:
    "Um iPhone novo, prático e sofisticado para quem quer desempenho consistente no uso diário.",
  category: "iPhone",
  featured: false,
  isNew: true,
  priceIsEstimated: true,
  releaseOrder: 16.01,
  tags: ["iphone", "16", "preto", "novo"],
  colors: [
    color("preto", "Preto", "#1F2937", "/images/products/iphone-16-preto.jpeg", 5799, [2, 1, 0, 0])
  ]
}
```

## Como adicionar várias cores

Coloque mais objetos `color(...)` dentro de `colors`.

```ts
colors: [
  color("preto", "Preto", "#1F2937", "/images/products/iphone-16-preto.jpeg", 5799, [2, 1, 0, 0]),
  color("branco", "Branco", "#F8FAFC", "/images/products/iphone-16-branco.jpeg", 5799, [1, 0, 0, 0])
]
```

Cada cor pode ter imagem, preço base e estoque diferentes.

## Como adicionar iPad, MacBook, Apple Watch ou Acessórios

Use o mesmo formato de produto e troque a `category`.

Exemplo de iPad:

```ts
{
  id: "ipad-air-11-m2",
  slug: "ipad-air-11-m2",
  name: "iPad Air 11 M2",
  model: "Air 11",
  shortDescription: "iPad novo com tela de 11 polegadas e desempenho M2.",
  description:
    "Uma opção leve para estudo, trabalho e entretenimento, com atendimento direto pelo WhatsApp.",
  category: "iPad",
  featured: false,
  isNew: true,
  priceIsEstimated: true,
  releaseOrder: 2026.11,
  tags: ["ipad", "air", "m2", "11"],
  colors: [
    color("azul", "Azul", "#9DB7D5", "/images/products/ipad-air-11-m2-azul.jpeg", 4999, [1, 1, 0, 0])
  ]
}
```

Exemplo de MacBook:

```ts
{
  id: "macbook-air-13-m3",
  slug: "macbook-air-13-m3",
  name: "MacBook Air 13 M3",
  model: "Air 13",
  shortDescription: "MacBook novo, fino e rápido para rotina profissional.",
  description:
    "Notebook Apple com construção leve, ótima bateria e compra assistida pela iZone Club.",
  category: "MacBook",
  featured: false,
  isNew: true,
  priceIsEstimated: true,
  releaseOrder: 2026.13,
  tags: ["macbook", "air", "m3", "13"],
  colors: [
    color("meia-noite", "Meia-noite", "#1F2937", "/images/products/macbook-air-13-m3-meia-noite.jpeg", 8999, [0, 1, 1, 0])
  ]
}
```

Exemplo de Apple Watch:

```ts
{
  id: "apple-watch-series-10",
  slug: "apple-watch-series-10",
  name: "Apple Watch Series 10",
  model: "Series 10",
  shortDescription: "Apple Watch novo para saúde, notificações e rotina.",
  description:
    "Relógio Apple com visual moderno e atendimento direto para confirmar disponibilidade.",
  category: "Apple Watch",
  featured: false,
  isNew: true,
  priceIsEstimated: true,
  releaseOrder: 2026.10,
  tags: ["apple watch", "series 10", "watch"],
  colors: [
    color("preto", "Preto", "#111827", "/images/products/apple-watch-series-10-preto.jpeg", 3499, [1, 0, 0, 0])
  ]
}
```

Exemplo de acessório:

```ts
{
  id: "airpods-pro-2",
  slug: "airpods-pro-2",
  name: "AirPods Pro 2",
  model: "Pro 2",
  shortDescription: "Fones novos com cancelamento de ruído.",
  description:
    "Acessório Apple novo com compra simples e confirmação de disponibilidade pelo WhatsApp.",
  category: "Acessórios",
  featured: false,
  isNew: true,
  priceIsEstimated: true,
  releaseOrder: 2026.02,
  tags: ["airpods", "pro", "fone", "acessorio"],
  colors: [
    color("branco", "Branco", "#F8FAFC", "/images/products/airpods-pro-2.jpeg", 1899, [1, 0, 0, 0])
  ]
}
```

Observação: hoje a tela de produto usa o seletor "Armazenamento" para todos os itens. Para acessórios ou Apple Watch, use a primeira posição do estoque (`128GB`) como a opção principal enquanto a interface não tiver um seletor específico para tamanho/modelo.

## Como deixar produto sem estoque

Use todos os estoques como zero:

```ts
color("preto", "Preto", "#1F2937", "/images/products/produto.jpeg", 5799, [0, 0, 0, 0])
```

O card aparece como sem estoque e o botão de adicionar fica desativado.

## Como destacar na home

Para aparecer na área "Modelos em evidência", use:

```ts
featured: true
```

A home mostra apenas os primeiros produtos destacados.

## Como ordenar novidades

O campo `releaseOrder` define a ordem dos produtos recentes.

```ts
releaseOrder: 17.3
```

Quanto maior o número, mais recente o produto parece para o site.

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
http://127.0.0.1:5173/iphones
```

## Erros comuns

- Esquecer vírgula entre produtos.
- Repetir o mesmo `slug`.
- Usar categoria escrita diferente, como `"Ipad"` em vez de `"iPad"`.
- Colocar imagem em `assets` e usar caminho de `public`.
- Escrever o caminho da imagem como `"public/images/products/..."`.
- Usar estoque com menos ou mais de 4 números.
- Deixar `colors` vazio.

## Checklist rápido

- Imagem em `public/images/products/`.
- Produto dentro de `products`.
- `id` único.
- `slug` único.
- `category` correta.
- `colors` preenchido.
- Estoque com 4 números.
- `npm.cmd test` passando.
