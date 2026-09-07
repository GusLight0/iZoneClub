import type { Product } from "../types/product";

type PreOwnedProductInput = Omit<Product, "featured" | "isNew" | "priceIsEstimated" | "releaseOrder"> & {
  priceIsEstimated?: boolean;
  releaseOrder?: number;
};

export function createPreOwnedProduct(product: PreOwnedProductInput): Product {
  return {
    ...product,
    featured: false,
    isNew: false,
    priceIsEstimated: product.priceIsEstimated ?? true,
    releaseOrder: product.releaseOrder ?? 0
  };
}

// Tutorial completo: leia src/data/TUTORIAL-SECOES.md antes de editar.
// A seção de seminovos também é separada das seções de produtos novos.
// Uma unidade por armazenamento listado; confirme a quantidade no atendimento.
export const preOwnedProducts: Product[] = [
  createPreOwnedProduct({
    "id": "iphone-12-pro-seminovo",
    "slug": "iphone-12-pro-seminovo",
    "name": "iPhone 12 Pro Seminovo",
    "model": "12 Pro",
    "shortDescription": "Seminovo com armazenamento de 128GB.",
    "description": "iPhone 12 Pro seminovo. Estado do aparelho, saúde da bateria, cor, garantia e acessórios inclusos devem ser confirmados no atendimento.",
    "category": "iPhone",
    "variantLabel": "Armazenamento",
    "priceIsEstimated": false,
    "releaseOrder": 12,
    "tags": [
      "iphone",
      "seminovo",
      "iphone 12 pro"
    ],
    "colors": [
      {
        "id": "consultar",
        "name": "Consultar disponibilidade",
        "hex": "#CBD5E1",
        "images": [
          "/images/products/sem-foto.svg"
        ],
        "variants": [
          {
            "storage": "128GB",
            "stock": 1,
            "price": 2299
          }
        ]
      }
    ]
  }),
  createPreOwnedProduct({
    "id": "iphone-12-pro-max-seminovo",
    "slug": "iphone-12-pro-max-seminovo",
    "name": "iPhone 12 Pro Max Seminovo",
    "model": "12 Pro Max",
    "shortDescription": "Seminovo com armazenamento de 128GB.",
    "description": "iPhone 12 Pro Max seminovo. Estado do aparelho, saúde da bateria, cor, garantia e acessórios inclusos devem ser confirmados no atendimento.",
    "category": "iPhone",
    "variantLabel": "Armazenamento",
    "priceIsEstimated": false,
    "releaseOrder": 12,
    "tags": [
      "iphone",
      "seminovo",
      "iphone 12 pro max"
    ],
    "colors": [
      {
        "id": "consultar",
        "name": "Consultar disponibilidade",
        "hex": "#CBD5E1",
        "images": [
          "/images/products/sem-foto.svg"
        ],
        "variants": [
          {
            "storage": "128GB",
            "stock": 1,
            "price": 2399
          }
        ]
      }
    ]
  }),
  createPreOwnedProduct({
    "id": "iphone-13-seminovo",
    "slug": "iphone-13-seminovo",
    "name": "iPhone 13 Seminovo",
    "model": "13",
    "shortDescription": "Seminovo com armazenamento de 128GB.",
    "description": "iPhone 13 seminovo. Estado do aparelho, saúde da bateria, cor, garantia e acessórios inclusos devem ser confirmados no atendimento.",
    "category": "iPhone",
    "variantLabel": "Armazenamento",
    "priceIsEstimated": false,
    "releaseOrder": 13,
    "tags": [
      "iphone",
      "seminovo",
      "iphone 13"
    ],
    "colors": [
      {
        "id": "consultar",
        "name": "Consultar disponibilidade",
        "hex": "#CBD5E1",
        "images": [
          "/images/products/sem-foto.svg"
        ],
        "variants": [
          {
            "storage": "128GB",
            "stock": 1,
            "price": 2199
          }
        ]
      }
    ]
  }),
  createPreOwnedProduct({
    "id": "iphone-13-pro-seminovo",
    "slug": "iphone-13-pro-seminovo",
    "name": "iPhone 13 Pro Seminovo",
    "model": "13 Pro",
    "shortDescription": "Seminovo com armazenamento de 128GB.",
    "description": "iPhone 13 Pro seminovo. Estado do aparelho, saúde da bateria, cor, garantia e acessórios inclusos devem ser confirmados no atendimento.",
    "category": "iPhone",
    "variantLabel": "Armazenamento",
    "priceIsEstimated": false,
    "releaseOrder": 13,
    "tags": [
      "iphone",
      "seminovo",
      "iphone 13 pro"
    ],
    "colors": [
      {
        "id": "consultar",
        "name": "Consultar disponibilidade",
        "hex": "#CBD5E1",
        "images": [
          "/images/products/sem-foto.svg"
        ],
        "variants": [
          {
            "storage": "128GB",
            "stock": 1,
            "price": 2899
          }
        ]
      }
    ]
  }),
  createPreOwnedProduct({
    "id": "iphone-13-pro-max-seminovo",
    "slug": "iphone-13-pro-max-seminovo",
    "name": "iPhone 13 Pro Max Seminovo",
    "model": "13 Pro Max",
    "shortDescription": "Seminovo com armazenamento de 128GB ou 256GB.",
    "description": "iPhone 13 Pro Max seminovo. Estado do aparelho, saúde da bateria, cor, garantia e acessórios inclusos devem ser confirmados no atendimento.",
    "category": "iPhone",
    "variantLabel": "Armazenamento",
    "priceIsEstimated": false,
    "releaseOrder": 13,
    "tags": [
      "iphone",
      "seminovo",
      "iphone 13 pro max"
    ],
    "colors": [
      {
        "id": "consultar",
        "name": "Consultar disponibilidade",
        "hex": "#CBD5E1",
        "images": [
          "/images/products/sem-foto.svg"
        ],
        "variants": [
          {
            "storage": "128GB",
            "stock": 1,
            "price": 3199
          },
          {
            "storage": "256GB",
            "stock": 1,
            "price": 3299
          }
        ]
      }
    ]
  }),
  createPreOwnedProduct({
    "id": "iphone-14-seminovo",
    "slug": "iphone-14-seminovo",
    "name": "iPhone 14 Seminovo",
    "model": "14",
    "shortDescription": "Seminovo com armazenamento de 128GB.",
    "description": "iPhone 14 seminovo. Estado do aparelho, saúde da bateria, cor, garantia e acessórios inclusos devem ser confirmados no atendimento.",
    "category": "iPhone",
    "variantLabel": "Armazenamento",
    "priceIsEstimated": false,
    "releaseOrder": 14,
    "tags": [
      "iphone",
      "seminovo",
      "iphone 14"
    ],
    "colors": [
      {
        "id": "consultar",
        "name": "Consultar disponibilidade",
        "hex": "#CBD5E1",
        "images": [
          "/images/products/sem-foto.svg"
        ],
        "variants": [
          {
            "storage": "128GB",
            "stock": 1,
            "price": 2399
          }
        ]
      }
    ]
  }),
  createPreOwnedProduct({
    "id": "iphone-14-pro-seminovo",
    "slug": "iphone-14-pro-seminovo",
    "name": "iPhone 14 Pro Seminovo",
    "model": "14 Pro",
    "shortDescription": "Seminovo com armazenamento de 128GB ou 256GB.",
    "description": "iPhone 14 Pro seminovo. Estado do aparelho, saúde da bateria, cor, garantia e acessórios inclusos devem ser confirmados no atendimento.",
    "category": "iPhone",
    "variantLabel": "Armazenamento",
    "priceIsEstimated": false,
    "releaseOrder": 14,
    "tags": [
      "iphone",
      "seminovo",
      "iphone 14 pro"
    ],
    "colors": [
      {
        "id": "consultar",
        "name": "Consultar disponibilidade",
        "hex": "#CBD5E1",
        "images": [
          "/images/products/sem-foto.svg"
        ],
        "variants": [
          {
            "storage": "128GB",
            "stock": 1,
            "price": 3099
          },
          {
            "storage": "256GB",
            "stock": 1,
            "price": 3299
          }
        ]
      }
    ]
  }),
  createPreOwnedProduct({
    "id": "iphone-14-pro-max-seminovo",
    "slug": "iphone-14-pro-max-seminovo",
    "name": "iPhone 14 Pro Max Seminovo",
    "model": "14 Pro Max",
    "shortDescription": "Seminovo com armazenamento de 128GB ou 256GB.",
    "description": "iPhone 14 Pro Max seminovo. Estado do aparelho, saúde da bateria, cor, garantia e acessórios inclusos devem ser confirmados no atendimento.",
    "category": "iPhone",
    "variantLabel": "Armazenamento",
    "priceIsEstimated": false,
    "releaseOrder": 14,
    "tags": [
      "iphone",
      "seminovo",
      "iphone 14 pro max"
    ],
    "colors": [
      {
        "id": "consultar",
        "name": "Consultar disponibilidade",
        "hex": "#CBD5E1",
        "images": [
          "/images/products/sem-foto.svg"
        ],
        "variants": [
          {
            "storage": "128GB",
            "stock": 1,
            "price": 3399
          },
          {
            "storage": "256GB",
            "stock": 1,
            "price": 3599
          }
        ]
      }
    ]
  }),
  createPreOwnedProduct({
    "id": "iphone-15-seminovo",
    "slug": "iphone-15-seminovo",
    "name": "iPhone 15 Seminovo",
    "model": "15",
    "shortDescription": "Seminovo com armazenamento de 128GB.",
    "description": "iPhone 15 seminovo. Estado do aparelho, saúde da bateria, cor, garantia e acessórios inclusos devem ser confirmados no atendimento.",
    "category": "iPhone",
    "variantLabel": "Armazenamento",
    "priceIsEstimated": false,
    "releaseOrder": 15,
    "tags": [
      "iphone",
      "seminovo",
      "iphone 15"
    ],
    "colors": [
      {
        "id": "consultar",
        "name": "Consultar disponibilidade",
        "hex": "#CBD5E1",
        "images": [
          "/images/products/sem-foto.svg"
        ],
        "variants": [
          {
            "storage": "128GB",
            "stock": 1,
            "price": 3299
          }
        ]
      }
    ]
  }),
  createPreOwnedProduct({
    "id": "iphone-15-pro-seminovo",
    "slug": "iphone-15-pro-seminovo",
    "name": "iPhone 15 Pro Seminovo",
    "model": "15 Pro",
    "shortDescription": "Seminovo com armazenamento de 128GB.",
    "description": "iPhone 15 Pro seminovo. Estado do aparelho, saúde da bateria, cor, garantia e acessórios inclusos devem ser confirmados no atendimento.",
    "category": "iPhone",
    "variantLabel": "Armazenamento",
    "priceIsEstimated": false,
    "releaseOrder": 15,
    "tags": [
      "iphone",
      "seminovo",
      "iphone 15 pro"
    ],
    "colors": [
      {
        "id": "consultar",
        "name": "Consultar disponibilidade",
        "hex": "#CBD5E1",
        "images": [
          "/images/products/sem-foto.svg"
        ],
        "variants": [
          {
            "storage": "128GB",
            "stock": 1,
            "price": 3599
          }
        ]
      }
    ]
  }),
  createPreOwnedProduct({
    "id": "iphone-15-pro-max-seminovo",
    "slug": "iphone-15-pro-max-seminovo",
    "name": "iPhone 15 Pro Max Seminovo",
    "model": "15 Pro Max",
    "shortDescription": "Seminovo com armazenamento de 256GB ou 512GB.",
    "description": "iPhone 15 Pro Max seminovo. Estado do aparelho, saúde da bateria, cor, garantia e acessórios inclusos devem ser confirmados no atendimento.",
    "category": "iPhone",
    "variantLabel": "Armazenamento",
    "priceIsEstimated": false,
    "releaseOrder": 15,
    "tags": [
      "iphone",
      "seminovo",
      "iphone 15 pro max"
    ],
    "colors": [
      {
        "id": "consultar",
        "name": "Consultar disponibilidade",
        "hex": "#CBD5E1",
        "images": [
          "/images/products/sem-foto.svg"
        ],
        "variants": [
          {
            "storage": "256GB",
            "stock": 1,
            "price": 4099
          },
          {
            "storage": "512GB",
            "stock": 1,
            "price": 4399
          }
        ]
      }
    ]
  }),
  createPreOwnedProduct({
    "id": "iphone-16-seminovo",
    "slug": "iphone-16-seminovo",
    "name": "iPhone 16 Seminovo",
    "model": "16",
    "shortDescription": "Seminovo com armazenamento de 128GB.",
    "description": "iPhone 16 seminovo. Estado do aparelho, saúde da bateria, cor, garantia e acessórios inclusos devem ser confirmados no atendimento.",
    "category": "iPhone",
    "variantLabel": "Armazenamento",
    "priceIsEstimated": false,
    "releaseOrder": 16,
    "tags": [
      "iphone",
      "seminovo",
      "iphone 16"
    ],
    "colors": [
      {
        "id": "consultar",
        "name": "Consultar disponibilidade",
        "hex": "#CBD5E1",
        "images": [
          "/images/products/sem-foto.svg"
        ],
        "variants": [
          {
            "storage": "128GB",
            "stock": 1,
            "price": 3899
          }
        ]
      }
    ]
  }),
  createPreOwnedProduct({
    "id": "iphone-16-pro-seminovo",
    "slug": "iphone-16-pro-seminovo",
    "name": "iPhone 16 Pro Seminovo",
    "model": "16 Pro",
    "shortDescription": "Seminovo com armazenamento de 128GB ou 256GB.",
    "description": "iPhone 16 Pro seminovo. Estado do aparelho, saúde da bateria, cor, garantia e acessórios inclusos devem ser confirmados no atendimento.",
    "category": "iPhone",
    "variantLabel": "Armazenamento",
    "priceIsEstimated": false,
    "releaseOrder": 16,
    "tags": [
      "iphone",
      "seminovo",
      "iphone 16 pro"
    ],
    "colors": [
      {
        "id": "consultar",
        "name": "Consultar disponibilidade",
        "hex": "#CBD5E1",
        "images": [
          "/images/products/sem-foto.svg"
        ],
        "variants": [
          {
            "storage": "128GB",
            "stock": 1,
            "price": 4299
          },
          {
            "storage": "256GB",
            "stock": 1,
            "price": 4899
          }
        ]
      }
    ]
  }),
  createPreOwnedProduct({
    "id": "iphone-16-pro-max-seminovo",
    "slug": "iphone-16-pro-max-seminovo",
    "name": "iPhone 16 Pro Max Seminovo",
    "model": "16 Pro Max",
    "shortDescription": "Seminovo com armazenamento de 256GB.",
    "description": "iPhone 16 Pro Max seminovo. Estado do aparelho, saúde da bateria, cor, garantia e acessórios inclusos devem ser confirmados no atendimento.",
    "category": "iPhone",
    "variantLabel": "Armazenamento",
    "priceIsEstimated": false,
    "releaseOrder": 16,
    "tags": [
      "iphone",
      "seminovo",
      "iphone 16 pro max"
    ],
    "colors": [
      {
        "id": "consultar",
        "name": "Consultar disponibilidade",
        "hex": "#CBD5E1",
        "images": [
          "/images/products/sem-foto.svg"
        ],
        "variants": [
          {
            "storage": "256GB",
            "stock": 1,
            "price": 5099
          }
        ]
      }
    ]
  })
];
