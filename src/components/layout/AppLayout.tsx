import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { BottomNavigation } from "../navigation/BottomNavigation";
import { Sidebar } from "../navigation/Sidebar";
import { Footer } from "./Footer";
import { CartDrawer } from "../cart/CartDrawer";

export function AppLayout() {
  const [cartOpen, setCartOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname, location.search]);

  return (
    <div className="min-h-screen min-w-0 overflow-x-hidden bg-white text-ink">
      <Sidebar
        onCartOpen={() => setCartOpen(true)}
        collapsed={sidebarCollapsed}
        onCollapsedChange={setSidebarCollapsed}
      />
      <div className={sidebarCollapsed ? "flex min-h-screen min-w-0 flex-col lg:pl-20" : "flex min-h-screen min-w-0 flex-col lg:pl-64"}>
        <main className="min-w-0 flex-1 pb-24 lg:pb-0">
          <Outlet />
        </main>
        <Footer />
      </div>
      <BottomNavigation />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}
