import type { CartItem } from "../types/cart";
import type { Product } from "../types/product";

export function checkCart(
  items: CartItem[],
  products: Product[],
): { items: CartItem[]; changed: boolean } {
  const next = items.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    const color = product?.colors.find((c) => c.id === item.colorId);
    const variant = color?.variants.find((v) => v.storage === item.storage);
    if (!product || !color || !variant || variant.stock < item.quantity)
      throw new Error(
        `${item.productName}: esta opção ou quantidade não está disponível. Remova o item ou ajuste a quantidade.`,
      );
    if (!Number.isInteger(item.quantity) || item.quantity < 1)
      throw new Error(
        "Quantidade inválida no carrinho. Remova o item e adicione novamente.",
      );
    return {
      ...item,
      productSlug: product.slug,
      productName: product.name,
      colorName: color.name,
      price: variant.price,
      maxStock: variant.stock,
      priceIsEstimated: product.priceIsEstimated,
      optionLabel:
        product.hasVariantOptions === false
          ? ""
          : product.variantLabel || "Armazenamento",
      optionValue:
        product.hasVariantOptions === false
          ? ""
          : variant.label || variant.storage,
      image: color.images[0],
    };
  });
  return {
    items: next,
    changed: next.some(
      (item, i) =>
        item.price !== items[i].price ||
        item.productName !== items[i].productName ||
        item.colorName !== items[i].colorName ||
        item.optionValue !== (items[i].optionValue ?? items[i].storage) ||
        item.priceIsEstimated !== items[i].priceIsEstimated,
    ),
  };
}
