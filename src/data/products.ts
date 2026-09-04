import type { Product, ProductColor, ProductVariant, StorageOption } from "../types/product";

const STORAGE_OPTIONS: StorageOption[] = ["128GB", "256GB", "512GB", "1TB"];

const IPAD_IMAGE = "https://www.apple.com/v/home/images/ipad-air-m4/a/promo_ipad_air_m4__bgcv7t286k8y_large.jpg";
const MACBOOK_IMAGE = "https://www.apple.com/v/home/images/macbook-air-m5/a/promo_macbook_air_m5__e5xk2yysqiie_large.jpg";
const WATCH_IMAGE =
  "https://www.apple.com/v/apple-watch-series-11/c/images/overview/product-viewer/product_landing_endframe__eaytrp6zz6c2_large.jpg";
const ACCESSORY_IMAGE =
  "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MQLN3_GEO_US?.v=S2U3dXZMblpTV3M4NkpScHppNDVqL1Y1N2w2YnRDOUU3NzYxVzNjaDM5cStpNFY0WVMxUVlnblJXSGt4T2pKc1lPWmZLL1BoWTdTZkt0SUlGYmZWZmc&fmt=jpeg&hei=2000&qlt=90&wid=2000";

function variants(basePrice: number, stocks: [number, number, number, number]): ProductVariant[] {
  const priceSteps = [0, 500, 1100, 1900];

  return STORAGE_OPTIONS.map((storage, index) => ({
    storage,
    stock: stocks[index],
    price: basePrice + priceSteps[index]
  }));
}

function variant(storage: StorageOption, price: number, stock: number, label?: string): ProductVariant {
  return { storage, price, stock, label };
}

function color(
  id: string,
  name: string,
  hex: string,
  image: string,
  basePriceOrVariants: number | ProductVariant[],
  stocks?: [number, number, number, number]
): ProductColor {
  return {
    id,
    name,
    hex,
    images: [image],
    variants: Array.isArray(basePriceOrVariants)
      ? basePriceOrVariants
      : variants(basePriceOrVariants, stocks ?? [0, 0, 0, 0])
  };
}

// Tutorial completo: leia src/data/TUTORIAL-SECOES.md antes de editar.
// Cada array abaixo alimenta uma seção própria do site.
export const iphoneProducts: Product[] = [
  {
    id: "iphone-17",
    slug: "iphone-17",
    name: "iPhone 17",
    model: "17",
    shortDescription: "Modelo atual com visual limpo e performance para o dia inteiro.",
    description:
      "Uma opção moderna para quem quer entrar na linha mais nova com uma experiência rápida, elegante e pronta para uso diário.",
    category: "iPhone",
    variantLabel: "Armazenamento",
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
    variantLabel: "Armazenamento",
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
    variantLabel: "Armazenamento",
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
    variantLabel: "Armazenamento",
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
    variantLabel: "Armazenamento",
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
    variantLabel: "Armazenamento",
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
    variantLabel: "Armazenamento",
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
    variantLabel: "Armazenamento",
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
    variantLabel: "Armazenamento",
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
    variantLabel: "Armazenamento",
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
    variantLabel: "Armazenamento",
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
    variantLabel: "Armazenamento",
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
    variantLabel: "Armazenamento",
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
    variantLabel: "Armazenamento",
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
    variantLabel: "Armazenamento",
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

export const ipadProducts: Product[] = [
  {
    id: "ipad-air-11-m4-azul",
    slug: "ipad-air-11-m4-azul",
    name: "iPad Air 11 M4",
    model: "Air 11",
    shortDescription: "iPad Air novo, leve e pronto para estudo, trabalho e criação.",
    description:
      "iPad Air 11 M4 novo usado como produto de exemplo da seção iPad. Confirme configuração, valor e disponibilidade pelo atendimento.",
    category: "iPad",
    variantLabel: "Armazenamento",
    imageAspectRatio: "portrait-3-4",
    featured: false,
    isNew: true,
    priceIsEstimated: true,
    releaseOrder: 2026.5,
    tags: ["ipad", "air", "m4", "azul", "novo"],
    colors: [
      color("azul", "Azul", "#A9C8D8", IPAD_IMAGE, [
        variant("128GB", 5799, 1),
        variant("256GB", 6499, 1),
        variant("512GB", 7799, 0),
        variant("1TB", 9499, 0)
      ])
    ]
  }
];

export const macBookProducts: Product[] = [
  {
    id: "macbook-air-13-m5-sky-blue",
    slug: "macbook-air-13-m5-sky-blue",
    name: "MacBook Air 13 M5",
    model: "Air 13",
    shortDescription: "MacBook Air novo em azul claro para rotina profissional e estudos.",
    description:
      "MacBook Air 13 M5 novo usado como produto de exemplo da seção MacBook. Confirme configuração, valor e disponibilidade pelo atendimento.",
    category: "MacBook",
    variantLabel: "Configuração",
    imageAspectRatio: "portrait-3-4",
    featured: false,
    isNew: true,
    priceIsEstimated: true,
    releaseOrder: 2026.4,
    tags: ["macbook", "air", "m5", "sky blue", "novo"],
    colors: [
      color("sky-blue", "Sky Blue", "#BFDDEC", MACBOOK_IMAGE, [
        variant("256GB", 9999, 1, "256GB SSD"),
        variant("512GB", 11999, 1, "512GB SSD")
      ])
    ]
  }
];

export const appleWatchProducts: Product[] = [
  {
    id: "apple-watch-series-11-rose-gold",
    slug: "apple-watch-series-11-rose-gold",
    name: "Apple Watch Series 11",
    model: "Series 11",
    shortDescription: "Apple Watch novo em rose gold para saúde, treinos e notificações.",
    description:
      "Apple Watch Series 11 novo usado como produto de exemplo da seção Apple Watch. Confirme tamanho, valor e disponibilidade pelo atendimento.",
    category: "Apple Watch",
    variantLabel: "Tamanho",
    imageAspectRatio: "portrait-3-4",
    featured: false,
    isNew: true,
    priceIsEstimated: true,
    releaseOrder: 2026.3,
    tags: ["apple watch", "series 11", "rose gold", "novo"],
    colors: [
      color("rose-gold", "Rose Gold", "#D9A38F", WATCH_IMAGE, [
        variant("128GB", 3999, 1, "42mm"),
        variant("256GB", 4299, 1, "46mm")
      ])
    ]
  }
];

export const accessoryProducts: Product[] = [
  {
    id: "adaptador-usb-c-70w",
    slug: "adaptador-usb-c-70w",
    name: "Adaptador de Energia USB-C de 70W",
    model: "70W USB-C",
    shortDescription: "Carregador USB-C Apple para uso em casa, escritório ou viagem.",
    description:
      "Adaptador de Energia USB-C de 70W usado como produto de exemplo da seção Acessórios. Confirme compatibilidade, valor e disponibilidade pelo atendimento.",
    category: "Acessórios",
    variantLabel: "Opção",
    imageAspectRatio: "portrait-3-4",
    featured: false,
    isNew: true,
    priceIsEstimated: true,
    releaseOrder: 2026.2,
    tags: ["acessorio", "adaptador", "usb-c", "70w", "carregador"],
    colors: [
      color("branco", "Branco", "#F8FAFC", ACCESSORY_IMAGE, [
        variant("128GB", 599, 1, "Única")
      ])
    ]
  }
];

export const products: Product[] = [
  ...iphoneProducts,
  ...ipadProducts,
  ...macBookProducts,
  ...appleWatchProducts,
  ...accessoryProducts
];

export const storageOptions = STORAGE_OPTIONS;
