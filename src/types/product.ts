export type StorageOption = "128GB" | "256GB" | "512GB" | "1TB";

export interface ProductVariant {
  storage: StorageOption;
  stock: number;
  price: number;
}

export interface ProductColor {
  id: string;
  name: string;
  hex: string;
  images: string[];
  variants: ProductVariant[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  model: string;
  shortDescription: string;
  description: string;
  category: "iPhone";
  featured: boolean;
  isNew: boolean;
  priceIsEstimated: boolean;
  releaseOrder: number;
  tags: string[];
  colors: ProductColor[];
}

export type AvailabilityLabel = "Disponível" | "Poucas unidades" | "Sem estoque";
