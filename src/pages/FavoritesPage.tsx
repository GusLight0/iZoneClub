import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCatalog } from "../contexts/CatalogContext";
import { useFavorites } from "../contexts/FavoritesContext";
import { usePageTitle } from "../hooks/usePageTitle";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { ProductGrid } from "../components/product/ProductGrid";
import { EmptyState } from "../components/ui/EmptyState";
import { buttonClassName } from "../components/ui/Button";

export function FavoritesPage() {
  const { products: allProducts } = useCatalog();
  usePageTitle("Favoritos | iZone Club");
  useScrollReveal();
  const { favorites } = useFavorites();
  const favoriteProducts = allProducts.filter((product) => favorites.includes(product.slug));

  if (!favoriteProducts.length) {
    return (
      <EmptyState
        icon={<Heart className="h-5 w-5" aria-hidden="true" />}
        title="Nenhum favorito ainda."
        description="Salve modelos para comparar depois com mais calma."
        action={
          <Link to="/iphones" className={buttonClassName({ variant: "primary" })}>
            Ver seções
          </Link>
        }
      />
    );
  }

  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div data-reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-brand">Favoritos</p>
          <h1 className="mt-2 text-3xl font-semibold text-ink">Modelos salvos</h1>
        </div>
        <div className="mt-6">
          <ProductGrid products={favoriteProducts} />
        </div>
      </div>
    </section>
  );
}
