import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { HomePage } from "./pages/HomePage";
import { CatalogPage } from "./pages/CatalogPage";
import { ProductSectionPage } from "./pages/ProductSectionPage";
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
        <Route path="iphones" element={<ProductSectionPage sectionId="iphones" />} />
        <Route path="ipads" element={<ProductSectionPage sectionId="ipads" />} />
        <Route path="macbooks" element={<ProductSectionPage sectionId="macbooks" />} />
        <Route path="apple-watch" element={<ProductSectionPage sectionId="apple-watch" />} />
        <Route path="acessorios" element={<ProductSectionPage sectionId="acessorios" />} />
        <Route path="seminovos" element={<ProductSectionPage sectionId="seminovos" />} />
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
