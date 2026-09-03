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

// Tutorial completo: leia src/data/TUTORIAL-SEMINOVOS.md antes de editar.
// A seção de seminovos fica vazia enquanto este array não tiver produtos.
export const preOwnedProducts: Product[] = [];
