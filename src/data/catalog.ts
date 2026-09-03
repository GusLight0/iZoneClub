import { preOwnedProducts } from "./preOwned";
import { products } from "./products";

export const allProducts = [...products, ...preOwnedProducts];

export function getProductBySlug(slug: string) {
  return allProducts.find((product) => product.slug === slug);
}
