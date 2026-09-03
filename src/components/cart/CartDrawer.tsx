import { ShoppingBag, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import type { DeliveryMode } from "../../types/cart";
import { useCart } from "../../contexts/CartContext";
import { formatCurrency } from "../../utils/currency";
import { createCartWhatsAppUrl } from "../../utils/whatsapp";
import { Button, buttonClassName } from "../ui/Button";
import { EmptyState } from "../ui/EmptyState";
import { CartLineItem } from "./CartLineItem";
import { cn } from "../../utils/cn";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, subtotal, clearCart } = useCart();
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>("Entrega");
  const whatsappUrl = createCartWhatsAppUrl(items, deliveryMode);

  return (
    <div className={cn("fixed inset-0 z-[75]", open ? "pointer-events-auto" : "pointer-events-none")} aria-hidden={!open}>
      <button
        type="button"
        aria-label="Fechar carrinho"
        className={cn("absolute inset-0 bg-ink/35 transition duration-200", open ? "opacity-100" : "opacity-0")}
        onClick={onClose}
      />
      <aside
        className={cn(
          "absolute right-0 top-0 flex h-full w-full max-w-[440px] flex-col bg-white shadow-[0_24px_80px_-44px_rgba(15,23,42,0.75)] transition duration-300 ease-smooth",
          open ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Carrinho"
      >
        <div className="flex min-h-16 items-center justify-between border-b border-slate-200 px-4">
          <div>
            <h2 className="text-base font-semibold text-ink">Carrinho</h2>
            <p className="text-xs text-slate-500">Valores sujeitos à confirmação no atendimento.</p>
          </div>
          <Button type="button" variant="ghost" size="icon" onClick={onClose} aria-label="Fechar carrinho">
            <X className="h-5 w-5" aria-hidden="true" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto px-4">
          {items.length ? (
            items.map((item) => <CartLineItem key={item.key} item={item} />)
          ) : (
            <EmptyState
              icon={<ShoppingBag className="h-5 w-5" aria-hidden="true" />}
              title="Seu carrinho está vazio."
              description="Encontre seu próximo iPhone e finalize pelo WhatsApp."
              action={
                <Link to="/produtos-novos" onClick={onClose} className={buttonClassName({ variant: "primary" })}>
                  Explorar produtos
                </Link>
              }
            />
          )}
        </div>

        {items.length ? (
          <div className="border-t border-slate-200 p-4">
            <div className="mb-4 grid grid-cols-2 gap-2">
              {(["Entrega", "Retirada"] as DeliveryMode[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setDeliveryMode(mode)}
                  className={cn(
                    "min-h-10 rounded-ui border px-3 text-sm font-medium outline-none transition focus-visible:ring-2 focus-visible:ring-blue-brand",
                    deliveryMode === mode
                      ? "border-blue-brand bg-blue-soft text-blue-deep"
                      : "border-slate-200 bg-white text-slate-700"
                  )}
                  aria-pressed={deliveryMode === mode}
                >
                  {mode}
                </button>
              ))}
            </div>
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-slate-600">Total estimado</span>
              <strong className="text-lg text-ink">{formatCurrency(subtotal)}</strong>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button type="button" variant="secondary" onClick={clearCart}>
                Esvaziar
              </Button>
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className={buttonClassName({ variant: "primary" })}>
                Finalizar
              </a>
            </div>
          </div>
        ) : null}
      </aside>
    </div>
  );
}
