import { createContext, useContext, useMemo } from "react";
import type { ReactNode } from "react";
import type { CartItem } from "../types/cart";
import type { Product, ProductColor, ProductVariant } from "../types/product";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface AddCartPayload {
  product: Product;
  color: ProductColor;
  variant: ProductVariant;
  image: string;
  quantity: number;
}

interface CartResult {
  ok: boolean;
  message: string;
}

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (payload: AddCartPayload) => CartResult;
  updateQuantity: (key: string, quantity: number) => CartResult;
  removeItem: (key: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "izone-club-cart";

function createKey(productId: string, colorId: string, storage: string) {
  return `${productId}:${colorId}:${storage}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useLocalStorage<CartItem[]>(STORAGE_KEY, []);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    function addItem(payload: AddCartPayload): CartResult {
      if (payload.variant.stock <= 0) {
        return { ok: false, message: "Esta configuração está sem estoque." };
      }

      let result: CartResult = { ok: true, message: `${payload.product.name} adicionado ao carrinho.` };
      const key = createKey(payload.product.id, payload.color.id, payload.variant.storage);

      setItems((current) => {
        const existing = current.find((item) => item.key === key);

        if (!existing) {
          const quantity = Math.min(payload.quantity, payload.variant.stock);
          if (quantity < payload.quantity) {
            result = {
              ok: true,
              message: `Quantidade máxima disponível: ${payload.variant.stock}.`
            };
          }

          return [
            ...current,
            {
              key,
              productId: payload.product.id,
              productSlug: payload.product.slug,
              productName: payload.product.name,
              colorId: payload.color.id,
              colorName: payload.color.name,
              storage: payload.variant.storage,
              image: payload.image,
              quantity,
              price: payload.variant.price,
              priceIsEstimated: payload.product.priceIsEstimated,
              maxStock: payload.variant.stock
            }
          ];
        }

        const nextQuantity = Math.min(existing.quantity + payload.quantity, payload.variant.stock);
        if (nextQuantity === existing.quantity) {
          result = {
            ok: false,
            message: `Quantidade máxima disponível: ${payload.variant.stock}.`
          };
        } else if (nextQuantity < existing.quantity + payload.quantity) {
          result = {
            ok: true,
            message: `Quantidade máxima disponível: ${payload.variant.stock}.`
          };
        }

        return current.map((item) =>
          item.key === key
            ? {
                ...item,
                quantity: nextQuantity,
                price: payload.variant.price,
                maxStock: payload.variant.stock
              }
            : item
        );
      });

      return result;
    }

    function updateQuantity(key: string, quantity: number): CartResult {
      let result: CartResult = { ok: true, message: "Quantidade atualizada." };

      setItems((current) =>
        current.map((item) => {
          if (item.key !== key) {
            return item;
          }

          const nextQuantity = Math.max(1, Math.min(quantity, item.maxStock));
          if (nextQuantity !== quantity) {
            result = { ok: false, message: `Quantidade máxima disponível: ${item.maxStock}.` };
          }

          return { ...item, quantity: nextQuantity };
        })
      );

      return result;
    }

    function removeItem(key: string) {
      setItems((current) => current.filter((item) => item.key !== key));
    }

    function clearCart() {
      setItems([]);
    }

    return {
      items,
      itemCount,
      subtotal,
      addItem,
      updateQuantity,
      removeItem,
      clearCart
    };
  }, [items, setItems]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
