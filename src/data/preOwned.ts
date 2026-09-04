import type { Product } from "../types/product";

const SEMINOVO_IMAGE = "/images/products/iphone-14-pro.jpeg";

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
export const preOwnedProducts: Product[] = [
  createPreOwnedProduct({
    id: "iphone-14-pro-256gb-gold-seminovo",
    slug: "iphone-14-pro-256gb-gold-seminovo",
    name: "iPhone 14 Pro Seminovo",
    model: "14 Pro",
    shortDescription: "iPhone seminovo de exemplo, com disponibilidade limitada.",
    description:
      "iPhone 14 Pro seminovo usado como produto de exemplo da seção Seminovos. Estado, bateria, garantia e acessórios inclusos devem ser confirmados no atendimento.",
    category: "iPhone",
    variantLabel: "Armazenamento",
    imageAspectRatio: "portrait-3-4",
    tags: ["iphone", "14 pro", "seminovo", "gold", "256gb"],
    colors: [
      {
        id: "gold",
        name: "Gold",
        hex: "#F4E0B9",
        images: [SEMINOVO_IMAGE],
        variants: [
          { storage: "256GB", stock: 1, price: 3899 },
          { storage: "512GB", stock: 0, price: 4499 },
          { storage: "1TB", stock: 0, price: 5299 }
        ]
      }
    ]
  })
];
