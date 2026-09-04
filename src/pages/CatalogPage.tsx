import { SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { products } from "../data/products";
import { usePageTitle } from "../hooks/usePageTitle";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { SearchBar } from "../components/filters/SearchBar";
import { FilterDrawer } from "../components/filters/FilterDrawer";
import { Button } from "../components/ui/Button";
import { EmptyState } from "../components/ui/EmptyState";
import { ProductGrid } from "../components/product/ProductGrid";
import { getLowestPrice, getProductAvailability } from "../utils/stock";
import { normalizeText, productMatchesSearch } from "../utils/search";
import type { AvailabilityLabel, ProductVariant } from "../types/product";

type SortOption = "newest" | "priceAsc" | "priceDesc" | "name";

interface Filters {
  model: string;
  option: string;
  color: string;
  availability: "" | AvailabilityLabel;
  minPrice: string;
  maxPrice: string;
  sort: SortOption;
}

const initialFilters: Filters = {
  model: "",
  option: "",
  color: "",
  availability: "",
  minPrice: "",
  maxPrice: "",
  sort: "newest"
};

function getVariantOptionLabel(variant: ProductVariant) {
  return variant.label ?? variant.storage;
}

export function CatalogPage() {
  usePageTitle("Produtos novos | iZone Club");
  useScrollReveal();

  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Filters>(() => ({
    ...initialFilters,
    model: searchParams.get("modelo") ?? "",
    sort: "newest"
  }));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const modelOptions = useMemo(
    () => Array.from(new Set(products.map((product) => product.model))).sort((a, b) => a.localeCompare(b, "pt-BR")),
    []
  );
  const optionOptions = useMemo(
    () =>
      Array.from(
        new Set(
          products.flatMap((product) =>
            product.colors.flatMap((color) => color.variants.map((variant) => getVariantOptionLabel(variant)))
          )
        )
      ).sort((a, b) => a.localeCompare(b, "pt-BR")),
    []
  );
  const colorOptions = useMemo(
    () =>
      Array.from(new Set(products.flatMap((product) => product.colors.map((color) => color.name)))).sort((a, b) =>
        a.localeCompare(b, "pt-BR")
      ),
    []
  );
  const filteredProducts = useMemo(() => {
    const minPrice = Number(filters.minPrice) || 0;
    const maxPrice = Number(filters.maxPrice) || Number.POSITIVE_INFINITY;

    return [...products]
      .filter((product) => productMatchesSearch(product, search))
      .filter((product) => !filters.model || normalizeText(product.model) === normalizeText(filters.model))
      .filter((product) =>
        !filters.option
          ? true
          : product.colors.some((color) =>
              color.variants.some((variant) => normalizeText(getVariantOptionLabel(variant)) === normalizeText(filters.option))
            )
      )
      .filter((product) =>
        !filters.color
          ? true
          : product.colors.some((color) => normalizeText(color.name) === normalizeText(filters.color))
      )
      .filter((product) => !filters.availability || getProductAvailability(product) === filters.availability)
      .filter((product) => {
        const price = getLowestPrice(product);
        return price >= minPrice && price <= maxPrice;
      })
      .sort((a, b) => {
        if (filters.sort === "priceAsc") return getLowestPrice(a) - getLowestPrice(b);
        if (filters.sort === "priceDesc") return getLowestPrice(b) - getLowestPrice(a);
        if (filters.sort === "name") return a.name.localeCompare(b.name, "pt-BR");
        return b.releaseOrder - a.releaseOrder;
      });
  }, [filters, search]);

  function updateFilter<Key extends keyof Filters>(key: Key, value: Filters[Key]) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  function clearFilters() {
    setFilters(initialFilters);
    setSearch("");
  }

  const activeFilters =
    Boolean(search) ||
    Object.entries(filters).some(([key, value]) => key !== "sort" && Boolean(value)) ||
    filters.sort !== "newest";

  const controls = (
    <div className="grid gap-4">
      <label className="grid gap-1.5 text-sm font-medium text-ink">
        Modelo
        <select
          value={filters.model}
          onChange={(event) => updateFilter("model", event.target.value)}
          className="h-11 rounded-ui border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-brand focus:ring-2 focus:ring-blue-brand/15"
        >
          <option value="">Todos</option>
          {modelOptions.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-1.5 text-sm font-medium text-ink">
        Opção
        <select
          value={filters.option}
          onChange={(event) => updateFilter("option", event.target.value)}
          className="h-11 rounded-ui border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-brand focus:ring-2 focus:ring-blue-brand/15"
        >
          <option value="">Todas</option>
          {optionOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-1.5 text-sm font-medium text-ink">
        Cor
        <select
          value={filters.color}
          onChange={(event) => updateFilter("color", event.target.value)}
          className="h-11 rounded-ui border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-brand focus:ring-2 focus:ring-blue-brand/15"
        >
          <option value="">Todas</option>
          {colorOptions.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-1.5 text-sm font-medium text-ink">
        Disponibilidade
        <select
          value={filters.availability}
          onChange={(event) => updateFilter("availability", event.target.value as Filters["availability"])}
          className="h-11 rounded-ui border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-brand focus:ring-2 focus:ring-blue-brand/15"
        >
          <option value="">Todas</option>
          <option value="Disponível">Disponível</option>
          <option value="Poucas unidades">Poucas unidades</option>
          <option value="Sem estoque">Sem estoque</option>
        </select>
      </label>
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-2">
        <label className="grid min-w-0 gap-1.5 text-sm font-medium text-ink">
          Mínimo
          <input
            type="number"
            min="0"
            inputMode="numeric"
            placeholder="R$"
            value={filters.minPrice}
            onChange={(event) => updateFilter("minPrice", event.target.value)}
            className="h-11 w-full min-w-0 rounded-ui border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-brand focus:ring-2 focus:ring-blue-brand/15"
          />
        </label>
        <label className="grid min-w-0 gap-1.5 text-sm font-medium text-ink">
          Máximo
          <input
            type="number"
            min="0"
            inputMode="numeric"
            placeholder="R$"
            value={filters.maxPrice}
            onChange={(event) => updateFilter("maxPrice", event.target.value)}
            className="h-11 w-full min-w-0 rounded-ui border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-brand focus:ring-2 focus:ring-blue-brand/15"
          />
        </label>
      </div>
      <label className="grid gap-1.5 text-sm font-medium text-ink">
        Ordenar
        <select
          value={filters.sort}
          onChange={(event) => updateFilter("sort", event.target.value as SortOption)}
          className="h-11 rounded-ui border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-brand focus:ring-2 focus:ring-blue-brand/15"
        >
          <option value="newest">Novidades</option>
          <option value="priceAsc">Menor preço</option>
          <option value="priceDesc">Maior preço</option>
          <option value="name">Nome</option>
        </select>
      </label>
      {activeFilters ? (
        <Button type="button" variant="ghost" onClick={clearFilters}>
          <X className="h-4 w-4" aria-hidden="true" />
          Limpar filtros
        </Button>
      ) : null}
    </div>
  );

  return (
    <section className="overflow-x-hidden px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl min-w-0">
        <div className="mb-6" data-reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-brand">Catálogo</p>
          <h1 className="mt-2 max-w-[320px] text-2xl font-semibold leading-tight text-ink sm:max-w-none sm:text-4xl">
            Produtos novos disponíveis
          </h1>
          <p className="mt-3 max-w-[310px] text-sm leading-6 text-slate-600 sm:max-w-2xl">
            Busque produtos novos sem misturar as seções principais da loja nos filtros.
          </p>
        </div>

        <div className="mb-5 grid min-w-0 gap-3 lg:grid-cols-[minmax(0,1fr)_auto]" data-reveal>
          <SearchBar value={search} onChange={setSearch} autoFocus={searchParams.has("buscar")} />
          <Button type="button" variant="secondary" onClick={() => setDrawerOpen(true)} className="lg:hidden">
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            Filtros
          </Button>
        </div>

        <div className="grid min-w-0 gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="hidden rounded-ui border border-slate-200 bg-white p-4 lg:block" data-reveal>
            <h2 className="mb-4 text-sm font-semibold text-ink">Filtros</h2>
            {controls}
          </aside>

          <div className="min-w-0">
            <div className="mb-4 flex items-center justify-between gap-3 text-sm text-slate-600">
              <span>{filteredProducts.length} produto(s)</span>
              {activeFilters ? (
                <Button type="button" variant="ghost" size="sm" onClick={clearFilters}>
                  Limpar
                </Button>
              ) : null}
            </div>
            {filteredProducts.length ? (
              <ProductGrid products={filteredProducts} />
            ) : (
              <EmptyState
                icon={<SearchIcon />}
                title="Nenhum produto encontrado."
                description="Tente limpar a busca ou ajustar os filtros para ver outros produtos."
                action={
                  <Button type="button" onClick={clearFilters}>
                    Limpar pesquisa
                  </Button>
                }
              />
            )}
          </div>
        </div>
      </div>
      <FilterDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        {controls}
      </FilterDrawer>
    </section>
  );
}

function SearchIcon() {
  return <SlidersHorizontal className="h-5 w-5" aria-hidden="true" />;
}
