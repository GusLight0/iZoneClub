import { ChevronUp, Home, MessageCircle, PackageOpen, ShoppingBag } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { productSections } from "../../data/productSections";
import { useCart } from "../../contexts/CartContext";
import { cn } from "../../utils/cn";

const sectionPaths = productSections.map((section) => section.href);

export function BottomNavigation() {
  const { itemCount } = useCart();
  const location = useLocation();
  const [productsOpen, setProductsOpen] = useState(false);
  const currentSection = productSections.find((section) => section.href === location.pathname);
  const ProductActionIcon = currentSection?.icon ?? PackageOpen;
  const productActionLabel = currentSection?.label ?? "Produtos";
  const productsActive = sectionPaths.includes(location.pathname) || location.pathname === "/produtos-novos";

  useEffect(() => {
    setProductsOpen(false);
  }, [location.pathname]);

  const itemClassName =
    "relative flex min-h-12 min-w-0 flex-col items-center justify-center gap-1 rounded-ui px-1 text-[10px] font-medium outline-none transition duration-200 focus-visible:ring-2 focus-visible:ring-blue-brand sm:text-[11px]";

  return (
    <>
      {productsOpen ? (
        <div
          id="mobile-product-menu"
          className="fixed inset-x-3 bottom-[calc(var(--nav-mobile-height)+env(safe-area-inset-bottom))] z-[70] mx-auto max-w-sm origin-bottom rounded-ui border border-blue-100 bg-white p-3 shadow-[0_28px_80px_-32px_rgba(15,23,42,0.42)] lg:hidden"
        >
          <div className="mb-2 flex items-center justify-between gap-3 px-1">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-brand">Categorias</span>
            <ChevronUp className="h-4 w-4 text-blue-brand" aria-hidden="true" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {productSections.map((section) => {
              const Icon = section.icon;
              const active = section.href === location.pathname;

              return (
                <Link
                  key={section.id}
                  to={section.href}
                  onClick={() => setProductsOpen(false)}
                  className={cn(
                    "flex min-h-12 items-center gap-2 rounded-ui border px-3 text-sm font-semibold transition",
                    active
                      ? "border-blue-brand bg-blue-brand text-white"
                      : "border-slate-200 bg-surface-50 text-slate-700 hover:border-blue-100 hover:bg-blue-soft hover:text-blue-deep"
                  )}
                >
                  <Icon className="h-4 w-4 flex-none" aria-hidden="true" />
                  <span className="min-w-0 truncate">{section.label}</span>
                </Link>
              );
            })}
          </div>
          <span
            className="absolute bottom-[-7px] left-[calc(25%+6px)] h-3.5 w-3.5 rotate-45 border-b border-r border-blue-100 bg-white"
            aria-hidden="true"
          />
        </div>
      ) : null}

      <nav
        className="fixed bottom-0 left-0 right-auto z-50 min-h-[var(--nav-mobile-height)] w-screen border-t border-slate-200 bg-white/96 px-2 pb-[calc(env(safe-area-inset-bottom)+8px)] pt-2 shadow-[0_-20px_55px_-34px_rgba(15,23,42,0.18)] backdrop-blur lg:hidden"
        aria-label="Navegação inferior"
      >
        <div className="mx-auto grid grid-cols-4 gap-1" style={{ width: "min(430px, calc(100vw - 16px))" }}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(
                itemClassName,
                isActive ? "bg-blue-brand text-white shadow-lift" : "text-slate-600 hover:bg-blue-soft hover:text-blue-deep"
              )
            }
          >
            <Home className="h-5 w-5" aria-hidden="true" />
            <span className="max-w-full truncate">Início</span>
          </NavLink>

          <button
            type="button"
            onClick={() => setProductsOpen((open) => !open)}
            className={cn(
              itemClassName,
              productsActive || productsOpen
                ? "bg-blue-brand text-white shadow-lift"
                : "text-slate-600 hover:bg-blue-soft hover:text-blue-deep"
            )}
            aria-expanded={productsOpen}
            aria-controls="mobile-product-menu"
            aria-label={productsOpen ? "Fechar categorias" : "Abrir categorias"}
          >
            <span className="relative">
              <ProductActionIcon className="h-5 w-5" aria-hidden="true" />
              <ChevronUp
                className={cn("absolute -right-3 -top-1 h-3 w-3 transition", productsOpen ? "rotate-180" : "rotate-0")}
                aria-hidden="true"
              />
            </span>
            <span className="max-w-full truncate">{productActionLabel}</span>
          </button>

          <NavLink
            to="/atendimento"
            className={({ isActive }) =>
              cn(
                itemClassName,
                isActive ? "bg-blue-brand text-white shadow-lift" : "text-slate-600 hover:bg-blue-soft hover:text-blue-deep"
              )
            }
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            <span className="max-w-full truncate">Atend.</span>
          </NavLink>

          <NavLink
            to="/carrinho"
            className={({ isActive }) =>
              cn(
                itemClassName,
                isActive ? "bg-blue-brand text-white shadow-lift" : "text-slate-600 hover:bg-blue-soft hover:text-blue-deep"
              )
            }
          >
            <ShoppingBag className="h-5 w-5" aria-hidden="true" />
            <span className="max-w-full truncate">Carrinho</span>
            {itemCount > 0 ? (
              <span className="absolute right-2 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-blue-brand px-1 text-[10px] font-semibold text-white">
                {itemCount}
              </span>
            ) : null}
          </NavLink>
        </div>
      </nav>
    </>
  );
}
