import type { Product, StorageOption } from "../types/product";

const STORAGE_OPTIONS: StorageOption[] = ["128GB", "256GB", "512GB", "1TB"];

// iPhones novos e lacrados conforme add-new-products.md.
// Uma unidade por configuração listada; confirme a quantidade no atendimento.
export const iphoneProducts: Product[] = [
  {
    "id": "iphone-15",
    "slug": "iphone-15",
    "name": "iPhone 15",
    "model": "15",
    "shortDescription": "Novo e lacrado, com 128GB de armazenamento.",
    "description": "iPhone 15 novo e lacrado, com 128GB de armazenamento. Consulte as cores disponíveis no atendimento.",
    "category": "iPhone",
    "variantLabel": "Armazenamento",
    "featured": true,
    "isNew": true,
    "priceIsEstimated": false,
    "releaseOrder": 15,
    "tags": [
      "iphone",
      "novo",
      "lacrado",
      "iphone 15",
      "128gb"
    ],
    "colors": [
      {
        "id": "consultar",
        "name": "Consultar disponibilidade",
        "hex": "#CBD5E1",
        "images": [
          "/images/products/iphone-15.jpeg"
        ],
        "variants": [
          {
            "storage": "128GB",
            "price": 4199,
            "stock": 1
          }
        ]
      }
    ]
  },
  {
    "id": "iphone-16-pro-max",
    "slug": "iphone-16-pro-max",
    "name": "iPhone 16 Pro Max",
    "model": "16 Pro Max",
    "shortDescription": "Novo e lacrado, com 256GB de armazenamento.",
    "description": "iPhone 16 Pro Max novo e lacrado, com 256GB de armazenamento. Consulte as cores disponíveis no atendimento.",
    "category": "iPhone",
    "variantLabel": "Armazenamento",
    "featured": true,
    "isNew": true,
    "priceIsEstimated": false,
    "releaseOrder": 16.3,
    "tags": [
      "iphone",
      "novo",
      "lacrado",
      "iphone 16 pro max",
      "256gb"
    ],
    "colors": [
      {
        "id": "consultar",
        "name": "Consultar disponibilidade",
        "hex": "#CBD5E1",
        "images": [
          "/images/products/iphone-16-pro-max.jpeg"
        ],
        "variants": [
          {
            "storage": "256GB",
            "price": 6999,
            "stock": 1
          }
        ]
      }
    ]
  },
  {
    "id": "iphone-17e",
    "slug": "iphone-17e",
    "name": "iPhone 17e",
    "model": "17e",
    "shortDescription": "Novo e lacrado, com 256GB de armazenamento.",
    "description": "iPhone 17e novo e lacrado, com 256GB de armazenamento. Consulte as cores disponíveis no atendimento.",
    "category": "iPhone",
    "variantLabel": "Armazenamento",
    "featured": true,
    "isNew": true,
    "priceIsEstimated": false,
    "releaseOrder": 17,
    "tags": [
      "iphone",
      "novo",
      "lacrado",
      "iphone 17e",
      "256gb"
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
            "price": 4699,
            "stock": 1
          }
        ]
      }
    ]
  },
  {
    "id": "iphone-17",
    "slug": "iphone-17",
    "name": "iPhone 17",
    "model": "17",
    "shortDescription": "Novo e lacrado, com 256GB de armazenamento.",
    "description": "iPhone 17 novo e lacrado, com 256GB de armazenamento. Consulte as cores disponíveis no atendimento.",
    "category": "iPhone",
    "variantLabel": "Armazenamento",
    "featured": true,
    "isNew": true,
    "priceIsEstimated": false,
    "releaseOrder": 17,
    "tags": [
      "iphone",
      "novo",
      "lacrado",
      "iphone 17",
      "256gb"
    ],
    "colors": [
      {
        "id": "consultar",
        "name": "Consultar disponibilidade",
        "hex": "#CBD5E1",
        "images": [
          "/images/products/iphone-17.jpeg"
        ],
        "variants": [
          {
            "storage": "256GB",
            "price": 5599,
            "stock": 1
          }
        ]
      }
    ]
  },
  {
    "id": "iphone-17-pro-max",
    "slug": "iphone-17-pro-max",
    "name": "iPhone 17 Pro Max",
    "model": "17 Pro Max",
    "shortDescription": "Novo e lacrado, com 1TB de armazenamento.",
    "description": "iPhone 17 Pro Max novo e lacrado, com 1TB de armazenamento. Consulte as cores disponíveis no atendimento.",
    "category": "iPhone",
    "variantLabel": "Armazenamento",
    "featured": true,
    "isNew": true,
    "priceIsEstimated": false,
    "releaseOrder": 17.3,
    "tags": [
      "iphone",
      "novo",
      "lacrado",
      "iphone 17 pro max",
      "1tb"
    ],
    "colors": [
      {
        "id": "consultar",
        "name": "Consultar disponibilidade",
        "hex": "#CBD5E1",
        "images": [
          "/images/products/iphone-17-pro-max.jpeg"
        ],
        "variants": [
          {
            "storage": "1TB",
            "price": 10350,
            "stock": 1
          }
        ]
      }
    ]
  }
];

// Produtos cadastrados conforme add-new-products.md.
// stock: 1 habilita a compra; confirme a quantidade física no atendimento.
export const ipadProducts: Product[] = [];

export const macBookProducts: Product[] = [
  {
    "id": "mac-neo-13",
    "slug": "mac-neo-13",
    "name": "Mac Neo 13″",
    "model": "Mac Neo 13″",
    "shortDescription": "Mac Neo 13″ com 8GB de memória e 256GB de armazenamento.",
    "description": "Mac Neo 13″ com 8GB de memória e 256GB de armazenamento.",
    "category": "MacBook",
    "variantLabel": "Configuração",
    "featured": false,
    "isNew": true,
    "priceIsEstimated": false,
    "releaseOrder": 2026,
    "tags": [
      "mac neo 13″",
      "macbook"
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
            "label": "8GB RAM / 256GB SSD",
            "price": 5199,
            "stock": 1
          }
        ]
      }
    ]
  },
  {
    "id": "mac-mini-m4",
    "slug": "mac-mini-m4",
    "name": "Mac Mini M4",
    "model": "Mac Mini M4",
    "shortDescription": "Mac Mini M4 com 16GB de memória e 512GB de armazenamento.",
    "description": "Mac Mini M4 com 16GB de memória e 512GB de armazenamento.",
    "category": "MacBook",
    "variantLabel": "Configuração",
    "featured": false,
    "isNew": true,
    "priceIsEstimated": false,
    "releaseOrder": 2026,
    "tags": [
      "mac mini m4",
      "macbook"
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
            "storage": "512GB",
            "label": "16GB RAM / 512GB SSD",
            "price": 6299,
            "stock": 1
          }
        ]
      }
    ]
  },
  {
    "id": "macbook-air-m5-13",
    "slug": "macbook-air-m5-13",
    "name": "MacBook Air M5 13″",
    "model": "MacBook Air M5 13″",
    "shortDescription": "MacBook Air M5 13″ com 16GB de memória e 512GB de armazenamento.",
    "description": "MacBook Air M5 13″ com 16GB de memória e 512GB de armazenamento.",
    "category": "MacBook",
    "variantLabel": "Configuração",
    "featured": false,
    "isNew": true,
    "priceIsEstimated": false,
    "releaseOrder": 2026,
    "tags": [
      "macbook air m5 13″",
      "macbook"
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
            "storage": "512GB",
            "label": "16GB RAM / 512GB SSD",
            "price": 8999,
            "stock": 1
          }
        ]
      }
    ]
  },
  {
    "id": "imac-m4-24",
    "slug": "imac-m4-24",
    "name": "iMac M4 24″",
    "model": "iMac M4 24″",
    "shortDescription": "iMac M4 24″ com 16GB de memória e 256GB de armazenamento.",
    "description": "iMac M4 24″ com 16GB de memória e 256GB de armazenamento.",
    "category": "MacBook",
    "variantLabel": "Configuração",
    "featured": false,
    "isNew": true,
    "priceIsEstimated": false,
    "releaseOrder": 2026,
    "tags": [
      "imac m4 24″",
      "macbook"
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
            "label": "16GB RAM / 256GB SSD",
            "price": 12699,
            "stock": 1
          }
        ]
      }
    ]
  },
  {
    "id": "macbook-pro-m5-14",
    "slug": "macbook-pro-m5-14",
    "name": "MacBook Pro M5 14″",
    "model": "MacBook Pro M5 14″",
    "shortDescription": "MacBook Pro M5 14″ com 24GB de memória e 2TB de armazenamento.",
    "description": "MacBook Pro M5 14″ com 24GB de memória e 2TB de armazenamento.",
    "category": "MacBook",
    "variantLabel": "Configuração",
    "featured": false,
    "isNew": true,
    "priceIsEstimated": false,
    "releaseOrder": 2026,
    "tags": [
      "macbook pro m5 14″",
      "macbook"
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
            "storage": "2TB",
            "label": "24GB RAM / 2TB SSD",
            "price": 18999,
            "stock": 1
          }
        ]
      }
    ]
  }
];

export const appleWatchProducts: Product[] = [
  {
    "id": "apple-watch-se-2",
    "slug": "apple-watch-se-2",
    "name": "Apple Watch SE 2",
    "model": "Apple Watch SE 2",
    "shortDescription": "Apple Watch SE 2 disponível em 44mm.",
    "description": "Apple Watch SE 2 disponível em 44mm.",
    "category": "Apple Watch",
    "variantLabel": "Tamanho",
    "featured": false,
    "isNew": true,
    "priceIsEstimated": false,
    "releaseOrder": 2026,
    "tags": [
      "apple watch se 2",
      "apple watch"
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
            "storage": "44mm",
            "label": "44mm",
            "price": 1699,
            "stock": 1
          }
        ]
      }
    ]
  },
  {
    "id": "apple-watch-se-3",
    "slug": "apple-watch-se-3",
    "name": "Apple Watch SE 3",
    "model": "Apple Watch SE 3",
    "shortDescription": "Apple Watch SE 3 disponível em 40mm ou 44mm.",
    "description": "Apple Watch SE 3 disponível em 40mm ou 44mm.",
    "category": "Apple Watch",
    "variantLabel": "Tamanho",
    "featured": false,
    "isNew": true,
    "priceIsEstimated": false,
    "releaseOrder": 2026,
    "tags": [
      "apple watch se 3",
      "apple watch"
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
            "storage": "40mm",
            "label": "40mm",
            "price": 1899,
            "stock": 1
          },
          {
            "storage": "44mm",
            "label": "44mm",
            "price": 2099,
            "stock": 1
          }
        ]
      }
    ]
  },
  {
    "id": "apple-watch-series-10",
    "slug": "apple-watch-series-10",
    "name": "Apple Watch Series 10",
    "model": "Apple Watch Series 10",
    "shortDescription": "Apple Watch Series 10 disponível em 46mm.",
    "description": "Apple Watch Series 10 disponível em 46mm.",
    "category": "Apple Watch",
    "variantLabel": "Tamanho",
    "featured": false,
    "isNew": true,
    "priceIsEstimated": false,
    "releaseOrder": 2026,
    "tags": [
      "apple watch series 10",
      "apple watch"
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
            "storage": "46mm",
            "label": "46mm",
            "price": 2599,
            "stock": 1
          }
        ]
      }
    ]
  },
  {
    "id": "apple-watch-series-11",
    "slug": "apple-watch-series-11",
    "name": "Apple Watch Series 11",
    "model": "Apple Watch Series 11",
    "shortDescription": "Apple Watch Series 11 disponível em 42mm ou 46mm.",
    "description": "Apple Watch Series 11 disponível em 42mm ou 46mm.",
    "category": "Apple Watch",
    "variantLabel": "Tamanho",
    "featured": false,
    "isNew": true,
    "priceIsEstimated": false,
    "releaseOrder": 2026,
    "tags": [
      "apple watch series 11",
      "apple watch"
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
            "storage": "42mm",
            "label": "42mm",
            "price": 2599,
            "stock": 1
          },
          {
            "storage": "46mm",
            "label": "46mm",
            "price": 2799,
            "stock": 1
          }
        ]
      }
    ]
  }
];

export const accessoryProducts: Product[] = [
  {
    "id": "apple-pencil-usb-c",
    "slug": "apple-pencil-usb-c",
    "name": "Apple Pencil USB-C",
    "model": "Apple Pencil USB-C",
    "shortDescription": "Apple Pencil USB-C.",
    "description": "Apple Pencil USB-C.",
    "category": "Acessórios",
    "variantLabel": "Opção",
    "featured": false,
    "isNew": true,
    "priceIsEstimated": false,
    "releaseOrder": 2026,
    "tags": [
      "apple pencil usb-c",
      "acessórios"
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
            "storage": "unique",
            "label": "Única",
            "price": 849.99,
            "stock": 1
          }
        ]
      }
    ]
  },
  {
    "id": "apple-pencil-pro",
    "slug": "apple-pencil-pro",
    "name": "Apple Pencil Pro",
    "model": "Apple Pencil Pro",
    "shortDescription": "Apple Pencil Pro.",
    "description": "Apple Pencil Pro.",
    "category": "Acessórios",
    "variantLabel": "Opção",
    "featured": false,
    "isNew": true,
    "priceIsEstimated": false,
    "releaseOrder": 2026,
    "tags": [
      "apple pencil pro",
      "acessórios"
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
            "storage": "unique",
            "label": "Única",
            "price": 1199,
            "stock": 1
          }
        ]
      }
    ]
  },
  {
    "id": "magic-mouse-preto",
    "slug": "magic-mouse-preto",
    "name": "Magic Mouse Preto",
    "model": "Magic Mouse Preto",
    "shortDescription": "Magic Mouse Preto.",
    "description": "Magic Mouse Preto.",
    "category": "Acessórios",
    "variantLabel": "Opção",
    "featured": false,
    "isNew": true,
    "priceIsEstimated": false,
    "releaseOrder": 2026,
    "tags": [
      "magic mouse preto",
      "acessórios"
    ],
    "colors": [
      {
        "id": "preto",
        "name": "Preto",
        "hex": "#202020",
        "images": [
          "/images/products/sem-foto.svg"
        ],
        "variants": [
          {
            "storage": "unique",
            "label": "Única",
            "price": 989.99,
            "stock": 1
          }
        ]
      }
    ]
  },
  {
    "id": "airpods-3",
    "slug": "airpods-3",
    "name": "AirPods 3",
    "model": "AirPods 3",
    "shortDescription": "AirPods 3.",
    "description": "AirPods 3.",
    "category": "Acessórios",
    "variantLabel": "Opção",
    "featured": false,
    "isNew": true,
    "priceIsEstimated": false,
    "releaseOrder": 2026,
    "tags": [
      "airpods 3",
      "acessórios"
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
            "storage": "unique",
            "label": "Única",
            "price": 999.99,
            "stock": 1
          }
        ]
      }
    ]
  },
  {
    "id": "airpods-4",
    "slug": "airpods-4",
    "name": "AirPods 4",
    "model": "AirPods 4",
    "shortDescription": "AirPods 4.",
    "description": "AirPods 4.",
    "category": "Acessórios",
    "variantLabel": "Opção",
    "featured": false,
    "isNew": true,
    "priceIsEstimated": false,
    "releaseOrder": 2026,
    "tags": [
      "airpods 4",
      "acessórios"
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
            "storage": "unique",
            "label": "Única",
            "price": 1199,
            "stock": 1
          }
        ]
      }
    ]
  },
  {
    "id": "airpods-4-anc",
    "slug": "airpods-4-anc",
    "name": "AirPods 4 ANC",
    "model": "AirPods 4 ANC",
    "shortDescription": "AirPods 4 ANC.",
    "description": "AirPods 4 ANC.",
    "category": "Acessórios",
    "variantLabel": "Opção",
    "featured": false,
    "isNew": true,
    "priceIsEstimated": false,
    "releaseOrder": 2026,
    "tags": [
      "airpods 4 anc",
      "acessórios"
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
            "storage": "unique",
            "label": "Única",
            "price": 1699,
            "stock": 1
          }
        ]
      }
    ]
  },
  {
    "id": "airpods-pro-3",
    "slug": "airpods-pro-3",
    "name": "AirPods Pro 3",
    "model": "AirPods Pro 3",
    "shortDescription": "AirPods Pro 3.",
    "description": "AirPods Pro 3.",
    "category": "Acessórios",
    "variantLabel": "Opção",
    "featured": false,
    "isNew": true,
    "priceIsEstimated": false,
    "releaseOrder": 2026,
    "tags": [
      "airpods pro 3",
      "acessórios"
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
            "storage": "unique",
            "label": "Única",
            "price": 2199,
            "stock": 1
          }
        ]
      }
    ]
  },
  {
    "id": "airpods-max-2-usb-c",
    "slug": "airpods-max-2-usb-c",
    "name": "AirPods Max 2 USB-C",
    "model": "AirPods Max 2 USB-C",
    "shortDescription": "AirPods Max 2 USB-C.",
    "description": "AirPods Max 2 USB-C.",
    "category": "Acessórios",
    "variantLabel": "Opção",
    "featured": false,
    "isNew": true,
    "priceIsEstimated": false,
    "releaseOrder": 2026,
    "tags": [
      "airpods max 2 usb-c",
      "acessórios"
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
            "storage": "unique",
            "label": "Única",
            "price": 4199,
            "stock": 1
          }
        ]
      }
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
