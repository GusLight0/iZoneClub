import type { Product } from "../types/product";

export function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export function productMatchesSearch(product: Product, query: string) {
  const normalizedQuery = normalizeText(query);

  if (!normalizedQuery) {
    return true;
  }

  const searchableText = [
    product.name,
    product.model,
    product.shortDescription,
    product.description,
    product.category,
    ...product.tags,
    ...product.colors.flatMap((color) => [
      color.name,
      ...color.variants.flatMap((variant) => [variant.storage, variant.label ?? ""])
    ])
  ].join(" ");

  return normalizeText(searchableText).includes(normalizedQuery);
}
