import { Home, MessageCircle, ShoppingBag, Smartphone } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { cn } from "../../utils/cn";

const navItems = [
  { label: "Início", href: "/", icon: Home },
  { label: "Catálogo", href: "/iphones", icon: Smartphone },
  { label: "Carrinho", href: "/carrinho", icon: ShoppingBag },
  { label: "Contato", href: "/atendimento", icon: MessageCircle }
];

export function BottomNavigation() {
  const { itemCount } = useCart();
  const location = useLocation();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/96 px-2 pb-[calc(env(safe-area-inset-bottom)+8px)] pt-2 shadow-[0_-20px_55px_-34px_rgba(15,23,42,0.18)] backdrop-blur lg:hidden"
      aria-label="Navegação inferior"
    >
      <div className="mx-auto grid w-full max-w-[360px] grid-cols-4 gap-1 sm:max-w-md">
        {navItems.map((item) => {
          const Icon = item.icon;
          const [path, query] = item.href.split("?");
          const active = location.pathname === path && (!query || location.search.includes(query));

          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={cn(
                "relative flex min-h-12 flex-col items-center justify-center gap-1 rounded-ui text-[11px] font-medium outline-none transition duration-200 focus-visible:ring-2 focus-visible:ring-blue-brand",
                active ? "bg-blue-brand text-white shadow-lift" : "text-slate-600 hover:bg-blue-soft hover:text-blue-deep"
              )}
            >
              <Icon className={cn("h-5 w-5 transition duration-200", active && "scale-105")} aria-hidden="true" />
              <span>{item.label}</span>
              {item.label === "Carrinho" && itemCount > 0 ? (
                <span className="absolute right-3 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-blue-brand px-1 text-[10px] font-semibold text-white">
                  {itemCount}
                </span>
              ) : null}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
