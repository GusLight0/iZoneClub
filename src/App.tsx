import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { HomePage } from "./pages/HomePage";
import { CatalogPage } from "./pages/CatalogPage";
import { SeminovosPage } from "./pages/SeminovosPage";
import { ProductPage } from "./pages/ProductPage";
import { CartPage } from "./pages/CartPage";
import { FavoritesPage } from "./pages/FavoritesPage";
import { ContactPage } from "./pages/ContactPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="produtos-novos" element={<CatalogPage />} />
        <Route path="iphones" element={<LegacyCatalogRedirect />} />
        <Route path="seminovos" element={<SeminovosPage />} />
        <Route path="produto/:slug" element={<ProductPage />} />
        <Route path="carrinho" element={<CartPage />} />
        <Route path="favoritos" element={<FavoritesPage />} />
        <Route path="atendimento" element={<ContactPage />} />
        <Route path="buscar" element={<Navigate to="/produtos-novos?buscar=1" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

function LegacyCatalogRedirect() {
  const location = useLocation();

  return <Navigate to={`/produtos-novos${location.search}`} replace />;
}
