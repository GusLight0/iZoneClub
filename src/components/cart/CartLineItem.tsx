import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import type { CartItem } from "../../types/cart";
import { useCart } from "../../contexts/CartContext";
import { useToast } from "../../contexts/ToastContext";
import { formatCurrency } from "../../utils/currency";
import { Button } from "../ui/Button";

interface CartLineItemProps {
  item: CartItem;
}

export function CartLineItem({ item }: CartLineItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const { showToast } = useToast();

  function changeQuantity(nextQuantity: number) {
    const result = updateQuantity(item.key, nextQuantity);
    if (!result.ok) {
      showToast(result.message, "info");
    }
  }

  function remove() {
    removeItem(item.key);
    showToast("Produto removido do carrinho.", "success");
  }

  return (
    <article className="grid grid-cols-[82px_1fr] gap-3 border-b border-slate-200 py-4 last:border-b-0">
      <Link to={`/produto/${item.productSlug}`} className="aspect-[4/5] overflow-hidden rounded-ui bg-surface-50">
        <img
          src={item.image}
          alt={item.productName}
          className="h-full w-full object-contain p-1"
          width="160"
          height="200"
          loading="lazy"
        />
      </Link>
      <div className="min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Link
              to={`/produto/${item.productSlug}`}
              className="block truncate text-sm font-semibold text-ink outline-none transition hover:text-blue-brand focus-visible:ring-2 focus-visible:ring-blue-brand"
            >
              {item.productName}
            </Link>
            <p className="mt-1 text-xs text-slate-500">
              {item.colorName} · {item.optionLabel ?? "Armazenamento"}: {item.optionValue ?? item.storage}
            </p>
          </div>
          <Button type="button" variant="ghost" size="icon" onClick={remove} aria-label={`Remover ${item.productName}`}>
            <Trash2 className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>

        <div className="mt-3 flex items-end justify-between gap-3">
          <div className="inline-flex h-9 items-center rounded-ui border border-slate-200 bg-white">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-r-none"
              onClick={() => changeQuantity(item.quantity - 1)}
              disabled={item.quantity <= 1}
              aria-label="Diminuir quantidade"
            >
              <Minus className="h-3.5 w-3.5" aria-hidden="true" />
            </Button>
            <output className="min-w-8 text-center text-sm font-semibold text-ink">{item.quantity}</output>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-l-none"
              onClick={() => changeQuantity(item.quantity + 1)}
              disabled={item.quantity >= item.maxStock}
              aria-label="Aumentar quantidade"
            >
              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
            </Button>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-ink">{formatCurrency(item.price * item.quantity)}</p>
            <p className="text-xs text-slate-500">{formatCurrency(item.price)} un.</p>
          </div>
        </div>
      </div>
    </article>
  );
}
