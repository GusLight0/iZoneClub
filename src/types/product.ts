export type StorageOption = "128GB" | "256GB" | "512GB" | "1TB";
export type ProductCategory = "iPhone" | "iPad" | "MacBook" | "Apple Watch" | "Acessórios";
export type ProductImageAspectRatio = "default" | "portrait-3-4";

export interface ProductVariant {
  storage: StorageOption;
  label?: string;
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
  category: ProductCategory;
  variantLabel?: string;
  imageAspectRatio?: ProductImageAspectRatio;
  featured: boolean;
  isNew: boolean;
  priceIsEstimated: boolean;
  releaseOrder: number;
  tags: string[];
  colors: ProductColor[];
}

export type AvailabilityLabel = "Disponível" | "Poucas unidades" | "Sem estoque";
