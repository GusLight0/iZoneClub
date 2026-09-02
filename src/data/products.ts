import type { Product, ProductColor, ProductVariant, StorageOption } from "../types/product";

const STORAGE_OPTIONS: StorageOption[] = ["128GB", "256GB", "512GB", "1TB"];

function variants(basePrice: number, stocks: [number, number, number, number]): ProductVariant[] {
  const priceSteps = [0, 500, 1100, 1900];

  return STORAGE_OPTIONS.map((storage, index) => ({
    storage,
    stock: stocks[index],
    price: basePrice + priceSteps[index]
  }));
}

function color(
  id: string,
  name: string,
  hex: string,
  image: string,
  basePrice: number,
  stocks: [number, number, number, number]
): ProductColor {
  return {
    id,
    name,
    hex,
    images: [image],
    variants: variants(basePrice, stocks)
  };
}

// Edite os produtos aqui. Para adicionar novas cores no futuro, acrescente outro objeto em "colors"
// com imagens reais daquela cor e suas variantes de armazenamento/estoque/preço.
export const products: Product[] = [
  {
    id: "iphone-17",
    slug: "iphone-17",
    name: "iPhone 17",
    model: "17",
    shortDescription: "Modelo atual com visual limpo e performance para o dia inteiro.",
    description:
      "Uma opção moderna para quem quer entrar na linha mais nova com uma experiência rápida, elegante e pronta para uso diário.",
    category: "iPhone",
    featured: true,
    isNew: true,
    priceIsEstimated: true,
    releaseOrder: 17,
    tags: ["branco", "novo", "iphone 17"],
    colors: [
      color("branco", "Branco", "#F7F8F8", "/images/products/iphone-17.jpeg", 7899, [1, 1, 1, 1])
    ]
  },
  {
    id: "iphone-17-pro",
    slug: "iphone-17-pro",
    name: "iPhone 17 Pro",
    model: "17 Pro",
    shortDescription: "Acabamento Pro com câmera avançada e desempenho premium.",
    description:
      "Criado para quem busca recursos profissionais, construção sofisticada e uma experiência de compra direta pelo WhatsApp.",
    category: "iPhone",
    featured: true,
    isNew: true,
    priceIsEstimated: true,
    releaseOrder: 17.2,
    tags: ["pro", "laranja", "cobre", "novo"],
    colors: [
      color("laranja-cobre", "Laranja cobre", "#D66C34", "/images/products/iphone-17-pro.jpeg", 10499, [1, 1, 1, 1])
    ]
  },
  {
    id: "iphone-17-pro-max",
    slug: "iphone-17-pro-max",
    name: "iPhone 17 Pro Max",
    model: "17 Pro Max",
    shortDescription: "Tela maior, bateria robusta e experiência Pro no máximo.",
    description:
      "A escolha para quem prefere tela ampla, acabamento marcante e configuração premium em todos os detalhes.",
    category: "iPhone",
    featured: true,
    isNew: true,
    priceIsEstimated: true,
    releaseOrder: 17.3,
    tags: ["pro max", "laranja", "cobre", "novo"],
    colors: [
      color("laranja-cobre", "Laranja cobre", "#D66C34", "/images/products/iphone-17-pro-max.jpeg", 11999, [1, 1, 1, 1])
    ]
  },
  {
    id: "iphone-16",
    slug: "iphone-16",
    name: "iPhone 16",
    model: "16",
    shortDescription: "Design leve, tela vibrante e ótimo equilíbrio para o uso diário.",
    description:
      "Um iPhone atual, prático e sofisticado para quem quer desempenho consistente sem abrir mão do visual premium.",
    category: "iPhone",
    featured: true,
    isNew: false,
    priceIsEstimated: true,
    releaseOrder: 16,
    tags: ["verde", "iphone 16"],
    colors: [
      color("verde-claro", "Verde claro", "#CDE7E2", "/images/products/iphone-16.jpeg", 5799, [1, 1, 1, 1])
    ]
  },
  {
    id: "iphone-16-pro",
    slug: "iphone-16-pro",
    name: "iPhone 16 Pro",
    model: "16 Pro",
    shortDescription: "Linha Pro com acabamento em tom claro e recursos avançados.",
    description:
      "Um modelo indicado para quem procura mais potência, acabamento refinado e ótimo conjunto de câmeras.",
    category: "iPhone",
    featured: true,
    isNew: false,
    priceIsEstimated: true,
    releaseOrder: 16.2,
    tags: ["pro", "titânio", "deserto"],
    colors: [
      color("titanio-deserto", "Titânio deserto", "#E2D3C0", "/images/products/iphone-16-pro.jpeg", 8099, [1, 1, 1, 1])
    ]
  },
  {
    id: "iphone-16-pro-max",
    slug: "iphone-16-pro-max",
    name: "iPhone 16 Pro Max",
    model: "16 Pro Max",
    shortDescription: "Tela ampla, linha Pro e acabamento sofisticado.",
    description:
      "Perfeito para quem quer tela grande, alta performance e uma presença visual premium.",
    category: "iPhone",
    featured: true,
    isNew: false,
    priceIsEstimated: true,
    releaseOrder: 16.3,
    tags: ["pro max", "titânio", "deserto"],
    colors: [
      color("titanio-deserto", "Titânio deserto", "#E2D3C0", "/images/products/iphone-16-pro-max.jpeg", 9299, [1, 1, 1, 1])
    ]
  },
  {
    id: "iphone-15",
    slug: "iphone-15",
    name: "iPhone 15",
    model: "15",
    shortDescription: "iPhone equilibrado com visual suave e ótimo custo-benefício.",
    description:
      "Uma escolha elegante para quem quer um aparelho atual, leve e com compra simples pelo atendimento da iZone Club.",
    category: "iPhone",
    featured: false,
    isNew: false,
    priceIsEstimated: true,
    releaseOrder: 15,
    tags: ["rosa", "iphone 15"],
    colors: [
      color("rosa", "Rosa", "#F7CDD8", "/images/products/iphone-15.jpeg", 4399, [1, 1, 1, 1])
    ]
  },
  {
    id: "iphone-15-pro",
    slug: "iphone-15-pro",
    name: "iPhone 15 Pro",
    model: "15 Pro",
    shortDescription: "Desempenho Pro em acabamento discreto e elegante.",
    description:
      "Indicado para quem procura uma experiência avançada com visual sóbrio e ótima durabilidade.",
    category: "iPhone",
    featured: false,
    isNew: false,
    priceIsEstimated: true,
    releaseOrder: 15.2,
    tags: ["pro", "titânio", "natural"],
    colors: [
      color("titanio-natural", "Titânio natural", "#B7B2A8", "/images/products/iphone-15-pro.jpeg", 6699, [1, 1, 1, 1])
    ]
  },
  {
    id: "iphone-15-pro-max",
    slug: "iphone-15-pro-max",
    name: "iPhone 15 Pro Max",
    model: "15 Pro Max",
    shortDescription: "Linha Pro Max com tela maior e acabamento natural.",
    description:
      "Uma configuração robusta para quem prioriza tela ampla, câmera avançada e performance.",
    category: "iPhone",
    featured: false,
    isNew: false,
    priceIsEstimated: true,
    releaseOrder: 15.3,
    tags: ["pro max", "titânio", "natural"],
    colors: [
      color("titanio-natural", "Titânio natural", "#B7B2A8", "/images/products/iphone-15-pro-max.jpeg", 7299, [1, 1, 1, 1])
    ]
  },
  {
    id: "iphone-14",
    slug: "iphone-14",
    name: "iPhone 14",
    model: "14",
    shortDescription: "Modelo versátil com cor roxa suave e ótima usabilidade.",
    description:
      "Um iPhone confiável para quem quer uma experiência moderna, com compra orientada e atendimento direto.",
    category: "iPhone",
    featured: false,
    isNew: false,
    priceIsEstimated: true,
    releaseOrder: 14,
    tags: ["roxo", "iphone 14"],
    colors: [
      color("roxo", "Roxo", "#DDD3F0", "/images/products/iphone-14.jpeg", 3599, [1, 1, 1, 1])
    ]
  },
  {
    id: "iphone-14-pro",
    slug: "iphone-14-pro",
    name: "iPhone 14 Pro",
    model: "14 Pro",
    shortDescription: "Linha Pro com tom roxo profundo e visual marcante.",
    description:
      "Um modelo Pro com excelente presença visual e recursos avançados para uso intenso.",
    category: "iPhone",
    featured: false,
    isNew: false,
    priceIsEstimated: true,
    releaseOrder: 14.2,
    tags: ["pro", "roxo", "profundo"],
    colors: [
      color("roxo-profundo", "Roxo profundo", "#62596E", "/images/products/iphone-14-pro.jpeg", 5299, [1, 1, 1, 1])
    ]
  },
  {
    id: "iphone-14-pro-max",
    slug: "iphone-14-pro-max",
    name: "iPhone 14 Pro Max",
    model: "14 Pro Max",
    shortDescription: "Tela maior, acabamento roxo profundo e categoria Pro.",
    description:
      "Uma alternativa premium para quem quer tela ampla e uma configuração Pro Max completa.",
    category: "iPhone",
    featured: false,
    isNew: false,
    priceIsEstimated: true,
    releaseOrder: 14.3,
    tags: ["pro max", "roxo", "profundo"],
    colors: [
      color("roxo-profundo", "Roxo profundo", "#62596E", "/images/products/iphone-14-pro-max.jpeg", 5999, [1, 1, 1, 1])
    ]
  },
  {
    id: "iphone-13",
    slug: "iphone-13",
    name: "iPhone 13",
    model: "13",
    shortDescription: "Clássico moderno em rosa claro, simples e confiável.",
    description:
      "Uma entrada excelente para o ecossistema iPhone, com visual leve e compra facilitada pelo WhatsApp.",
    category: "iPhone",
    featured: false,
    isNew: false,
    priceIsEstimated: true,
    releaseOrder: 13,
    tags: ["rosa", "iphone 13"],
    colors: [
      color("rosa", "Rosa", "#F8D9D4", "/images/products/iphone-13.jpeg", 2999, [1, 1, 1, 1])
    ]
  },
  {
    id: "iphone-13-pro",
    slug: "iphone-13-pro",
    name: "iPhone 13 Pro",
    model: "13 Pro",
    shortDescription: "Linha Pro em azul sierra com ótima presença.",
    description:
      "Um iPhone Pro ainda muito desejado, com acabamento azul sierra e experiência premium.",
    category: "iPhone",
    featured: false,
    isNew: false,
    priceIsEstimated: true,
    releaseOrder: 13.2,
    tags: ["pro", "azul", "sierra"],
    colors: [
      color("azul-sierra", "Azul sierra", "#A9C4DC", "/images/products/iphone-13-pro.jpeg", 4499, [1, 1, 1, 1])
    ]
  },
  {
    id: "iphone-13-pro-max",
    slug: "iphone-13-pro-max",
    name: "iPhone 13 Pro Max",
    model: "13 Pro Max",
    shortDescription: "Tela ampla em azul sierra, com acabamento Pro Max.",
    description:
      "Uma opção elegante para quem quer tela maior, construção Pro e atendimento direto para finalizar a compra.",
    category: "iPhone",
    featured: false,
    isNew: false,
    priceIsEstimated: true,
    releaseOrder: 13.3,
    tags: ["pro max", "azul", "sierra"],
    colors: [
      color("azul-sierra", "Azul sierra", "#A9C4DC", "/images/products/iphone-13-pro-max.jpeg", 4999, [1, 1, 1, 1])
    ]
  }
];

export const storageOptions = STORAGE_OPTIONS;

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}
