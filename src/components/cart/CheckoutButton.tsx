import { useRef, useState } from "react";
import { useCart } from "../../contexts/CartContext";
import { useToast } from "../../contexts/ToastContext";
import { useCatalog } from "../../contexts/CatalogContext";
import {
  fetchStoreProducts,
  toProduct,
  remoteCatalogEnabled,
  errorMessage,
} from "../../lib/store";
import { checkCart } from "../../utils/checkout";
import { createCartWhatsAppUrl } from "../../utils/whatsapp";
import type { DeliveryMode } from "../../types/cart";
import { Button } from "../ui/Button";

export function CheckoutButton({
  deliveryMode,
}: {
  deliveryMode: DeliveryMode;
}) {
  const { items, replaceItems } = useCart();
  const { products } = useCatalog();
  const { showToast } = useToast();
  const [busy, setBusy] = useState(false);
  const latest = useRef(items);
  latest.current = items;
  const lock = useRef(false);
  async function checkout() {
    if (lock.current) return;
    lock.current = true;
    setBusy(true);
    const snapshot = items;
    try {
      const current = remoteCatalogEnabled
        ? (await fetchStoreProducts()).map(toProduct)
        : products;
      if (latest.current !== snapshot)
        throw new Error(
          "O carrinho mudou durante a consulta. Confira e tente novamente.",
        );
      const checked = checkCart(snapshot, current);
      replaceItems(checked.items);
      if (checked.changed) {
        showToast(
          "Os dados do pedido foram atualizados. Confira os valores e clique novamente para finalizar.",
          "info",
        );
        return;
      }
      window.location.assign(
        createCartWhatsAppUrl(checked.items, deliveryMode),
      );
    } catch (e) {
      showToast(errorMessage(e), "error");
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }
  return (
    <Button
      type="button"
      className="w-full"
      disabled={busy || !items.length}
      onClick={() => void checkout()}
    >
      {busy ? "Conferindo estoque…" : "Finalizar pelo WhatsApp"}
    </Button>
  );
}
