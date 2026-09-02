import type { AvailabilityLabel, Product, ProductColor, ProductVariant, StorageOption } from "../types/product";

export function getAllVariants(product: Product) {
  return product.colors.flatMap((color) =>
    color.variants.map((variant) => ({
      color,
      variant
    }))
  );
}

export function getLowestPrice(product: Product) {
  return Math.min(...getAllVariants(product).map(({ variant }) => variant.price));
}

export function getTotalStock(product: Product) {
  return getAllVariants(product).reduce((total, { variant }) => total + variant.stock, 0);
}

export function getColorStock(color: ProductColor) {
  return color.variants.reduce((total, variant) => total + variant.stock, 0);
}

export function getVariant(color: ProductColor, storage: StorageOption) {
  return color.variants.find((variant) => variant.storage === storage) ?? color.variants[0];
}

export function getFirstAvailableVariant(product: Product) {
  return getAllVariants(product).find(({ variant }) => variant.stock > 0) ?? getAllVariants(product)[0];
}

export function isVariantAvailable(variant?: ProductVariant) {
  return Boolean(variant && variant.stock > 0);
}

export function getAvailabilityFromStock(stock: number): AvailabilityLabel {
  if (stock <= 0) return "Sem estoque";
  if (stock <= 2) return "Poucas unidades";
  return "Disponível";
}

export function getProductAvailability(product: Product): AvailabilityLabel {
  return getAvailabilityFromStock(getTotalStock(product));
}

export function getStockTone(stock: number) {
  if (stock <= 0) return "neutral";
  if (stock <= 2) return "warning";
  return "success";
}
