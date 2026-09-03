import { MessageCircle, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import type { DeliveryMode } from "../types/cart";
import { useCart } from "../contexts/CartContext";
import { usePageTitle } from "../hooks/usePageTitle";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { CartLineItem } from "../components/cart/CartLineItem";
import { EmptyState } from "../components/ui/EmptyState";
import { Button, buttonClassName } from "../components/ui/Button";
import { formatCurrency } from "../utils/currency";
import { createCartWhatsAppUrl } from "../utils/whatsapp";
import { cn } from "../utils/cn";

export function CartPage() {
  usePageTitle("Carrinho | iZone Club");
  useScrollReveal();
  const { items, subtotal, clearCart } = useCart();
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>("Entrega");

  if (!items.length) {
    return (
      <EmptyState
        icon={<ShoppingBag className="h-5 w-5" aria-hidden="true" />}
        title="Seu carrinho está vazio."
        description="Encontre seu próximo iPhone e finalize pelo WhatsApp."
        action={
          <Link to="/produtos-novos" className={buttonClassName({ variant: "primary" })}>
            Explorar produtos
          </Link>
        }
      />
    );
  }

  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_360px]">
        <div data-reveal>
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-brand">Carrinho</p>
              <h1 className="mt-2 text-3xl font-semibold text-ink">Seu pedido</h1>
            </div>
            <Button type="button" variant="ghost" size="sm" onClick={clearCart}>
              Esvaziar
            </Button>
          </div>
          <div className="rounded-ui border border-slate-200 bg-white px-4">
            {items.map((item) => (
              <CartLineItem key={item.key} item={item} />
            ))}
          </div>
        </div>

        <aside
          className="h-fit rounded-ui border border-slate-200 bg-surface-50 p-5 lg:sticky lg:top-6"
          data-reveal
          data-reveal-delay="120"
        >
          <h2 className="text-lg font-semibold text-ink">Resumo</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Valores e disponibilidade sujeitos à confirmação no atendimento.
          </p>
          <div className="mt-5 grid grid-cols-2 gap-2">
            {(["Entrega", "Retirada"] as DeliveryMode[]).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setDeliveryMode(mode)}
                className={cn(
                  "min-h-11 rounded-ui border px-3 text-sm font-medium outline-none transition focus-visible:ring-2 focus-visible:ring-blue-brand",
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
          <div className="my-5 flex items-center justify-between border-y border-slate-200 py-4">
            <span className="text-sm text-slate-600">Total estimado</span>
            <strong className="text-xl text-ink">{formatCurrency(subtotal)}</strong>
          </div>
          <a
            href={createCartWhatsAppUrl(items, deliveryMode)}
            target="_blank"
            rel="noreferrer"
            className={buttonClassName({ variant: "primary", size: "lg", className: "w-full" })}
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Finalizar pelo WhatsApp
          </a>
        </aside>
      </div>
    </section>
  );
}
