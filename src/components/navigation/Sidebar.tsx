import {
  Home,
  Menu,
  MessageCircle,
  PackageCheck,
  PanelLeftClose,
  ShoppingBag,
  Smartphone
} from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { cn } from "../../utils/cn";
import { Button } from "../ui/Button";
import { BrandLogo } from "../ui/BrandLogo";

interface SidebarProps {
  onCartOpen: () => void;
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
}

const navItems = [
  { label: "Início", href: "/", icon: Home },
  { label: "Produtos novos", href: "/produtos-novos", icon: Smartphone },
  { label: "Seminovos", href: "/seminovos", icon: PackageCheck },
  { label: "Atendimento", href: "/atendimento", icon: MessageCircle }
];

export function Sidebar({ onCartOpen, collapsed, onCollapsedChange }: SidebarProps) {
  const { itemCount } = useCart();
  const location = useLocation();

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 hidden flex-col border-r border-blue-deep/40 bg-gradient-to-b from-blue-deep via-[#0C3C8A] to-blue-brand text-white shadow-[18px_0_70px_-46px_rgba(21,94,239,0.8)] backdrop-blur lg:flex",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex min-h-20 items-center justify-between gap-3 px-4">
        <Link
          to="/"
          className={cn(
            "min-w-0 rounded-ui outline-none transition focus-visible:ring-2 focus-visible:ring-blue-brand",
            collapsed ? "mx-auto" : ""
          )}
        >
          <BrandLogo showName={!collapsed} size="md" tone="dark" />
        </Link>
        {!collapsed ? (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onCollapsedChange(true)}
            aria-label="Recolher menu"
            className="text-white hover:bg-white/20 hover:text-white focus-visible:ring-white"
          >
            <PanelLeftClose className="h-5 w-5" aria-hidden="true" />
          </Button>
        ) : null}
      </div>

      {collapsed ? (
        <div className="px-4">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onCollapsedChange(false)}
            aria-label="Expandir menu"
            className="text-white hover:bg-white/20 hover:text-white focus-visible:ring-white"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </Button>
        </div>
      ) : null}

      <nav className="mt-4 flex flex-1 flex-col gap-1 px-3" aria-label="Navegação principal">
        {navItems.map((item) => {
          const Icon = item.icon;
          const [path, query] = item.href.split("?");
          const active = location.pathname === path && (!query || location.search.includes(query));

          return (
            <NavLink
              key={item.href}
              to={item.href}
              title={collapsed ? item.label : undefined}
              className={cn(
                "group relative flex min-h-11 items-center gap-3 rounded-ui px-3 text-sm font-medium outline-none transition duration-200 focus-visible:ring-2 focus-visible:ring-white",
                active ? "bg-white text-blue-deep shadow-soft" : "text-blue-50/90 hover:bg-white/10 hover:text-white",
                collapsed && "justify-center px-0"
              )}
            >
              <Icon className="h-5 w-5 flex-none" aria-hidden="true" />
              {!collapsed ? <span>{item.label}</span> : null}
            </NavLink>
          );
        })}

        <button
          type="button"
          onClick={onCartOpen}
          title={collapsed ? "Carrinho" : undefined}
          className={cn(
            "relative flex min-h-11 items-center gap-3 rounded-ui px-3 text-sm font-medium text-blue-50/90 outline-none transition duration-200 hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-white",
            collapsed && "justify-center px-0"
          )}
        >
          <ShoppingBag className="h-5 w-5 flex-none" aria-hidden="true" />
          {!collapsed ? <span>Carrinho</span> : null}
          {itemCount > 0 ? (
            <span className="ml-auto grid h-5 min-w-5 place-items-center rounded-full bg-white px-1.5 text-xs font-semibold text-blue-deep">
              {itemCount}
            </span>
          ) : null}
        </button>
      </nav>

      {!collapsed ? (
        <div className="px-4 pb-4 text-xs leading-5 text-blue-100">
          <p>São Luís - MA</p>
          <p>Compra pelo WhatsApp</p>
        </div>
      ) : null}
    </aside>
  );
}
