import type { StorageOption } from "./product";

export interface CartItem {
  key: string;
  productId: string;
  productSlug: string;
  productName: string;
  colorId: string;
  colorName: string;
  storage: StorageOption;
  optionLabel?: string;
  optionValue?: string;
  image: string;
  quantity: number;
  price: number;
  priceIsEstimated: boolean;
  maxStock: number;
}

export type DeliveryMode = "Entrega" | "Retirada";
