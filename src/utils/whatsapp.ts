import type { CartItem, DeliveryMode } from "../types/cart";
import type { Product, ProductColor, ProductVariant } from "../types/product";
import { formatCurrency } from "./currency";

export const WHATSAPP_PHONE = "5598992129902";
export const WHATSAPP_DISPLAY = "+55 98 99212-9902";
export const CONTACT_EMAIL = "izoneclub.br@gmail.com";

function buildUrl(message: string) {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

function getVariantLabel(product: Product) {
  return product.variantLabel ?? "Armazenamento";
}

function getVariantValue(variant: ProductVariant) {
  return variant.label ?? variant.storage;
}

export function createProductWhatsAppUrl(
  product: Product,
  color: ProductColor,
  variant: ProductVariant,
  quantity: number
) {
  const subtotal = variant.price * quantity;
  const priceLabel = "Preço";
  const variantLabel = getVariantLabel(product);
  const variantValue = getVariantValue(variant);

  return buildUrl(`Olá! Tenho interesse neste produto da iZone Club.

Produto: ${product.name}
Cor: ${color.name}
${variantLabel}: ${variantValue}
Quantidade: ${quantity}
${priceLabel}: ${formatCurrency(variant.price)}
Subtotal estimado: ${formatCurrency(subtotal)}

Forma de recebimento:
A combinar

Gostaria de finalizar a compra.`);
}

export function createCartWhatsAppUrl(items: CartItem[], deliveryMode: DeliveryMode) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const orderLines = items
    .map(
      (item, index) => `${index + 1}. ${item.quantity}x ${item.productName}
Cor: ${item.colorName}
${item.optionLabel ?? "Armazenamento"}: ${item.optionValue ?? item.storage}
Valor unitário: ${formatCurrency(item.price)}
Subtotal: ${formatCurrency(item.price * item.quantity)}`
    )
    .join("\n\n");

  return buildUrl(`Olá! Quero finalizar meu pedido na iZone Club.

PEDIDO:

${orderLines}

TOTAL ESTIMADO:
${formatCurrency(total)}

Recebimento:
${deliveryMode} a combinar.

Aguardo o atendimento para confirmar disponibilidade, valor final e pagamento.`);
}
