import { ArrowRight, MessageCircle, PackageOpen } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useCatalog } from "../contexts/CatalogContext";
import type { ProductSectionId } from "../data/productSections";
import { getProductSectionById, productSections } from "../data/productSections";
import { usePageTitle } from "../hooks/usePageTitle";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { SearchBar } from "../components/filters/SearchBar";
import { ProductGrid } from "../components/product/ProductGrid";
import { Button, buttonClassName } from "../components/ui/Button";
import { EmptyState } from "../components/ui/EmptyState";
import { productMatchesSearch } from "../utils/search";
import { WHATSAPP_PHONE } from "../utils/whatsapp";

interface ProductSectionPageProps {
  sectionId: ProductSectionId;
}

export function ProductSectionPage({ sectionId }: ProductSectionPageProps) {
  const { products } = useCatalog();
  const metadata = getProductSectionById(sectionId) ?? productSections[0];
  const section = { ...metadata, products: useMemo(() => products.filter(p => metadata.isPreOwned ? !p.isNew : p.isNew && p.category === metadata.category), [products, metadata]) };
  const relatedSections = productSections.filter((item) => item.id !== section.id).slice(0, 3);
  const [search, setSearch] = useState("");
  const filteredProducts = useMemo(
    () => section.products.filter((product) => productMatchesSearch(product, search)),
    [search, section.products]
  );

  usePageTitle(`${section.label} | iZone Club`);
  useScrollReveal();

  return (
    <>
      <section className="border-b border-slate-200 bg-surface-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div data-reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-brand">{section.eyebrow}</p>
            <h1 className="mt-2 text-balance text-3xl font-semibold text-ink sm:text-4xl">{section.title}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">{section.description}</p>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-5" data-reveal>
            <SearchBar value={search} onChange={setSearch} />
          </div>

          {section.products.length && filteredProducts.length ? (
            <ProductGrid products={filteredProducts} />
          ) : section.products.length ? (
            <div className="rounded-ui border border-dashed border-slate-300 bg-white" data-reveal>
              <EmptyState
                icon={<PackageOpen className="h-5 w-5" aria-hidden="true" />}
                title="Nenhum produto encontrado."
                description="Tente buscar por outro nome, modelo, cor ou opção."
                action={
                  <Button type="button" variant="secondary" onClick={() => setSearch("")}>
                    Limpar busca
                  </Button>
                }
              />
            </div>
          ) : (
            <div className="rounded-ui border border-dashed border-slate-300 bg-white" data-reveal>
              <EmptyState
                icon={<PackageOpen className="h-5 w-5" aria-hidden="true" />}
                title={section.emptyTitle}
                description="Em breve teremos novidades nesta se??o. Consulte nossa equipe."
                action={
                  <a
                    href={`https://wa.me/${WHATSAPP_PHONE}`}
                    target="_blank"
                    rel="noreferrer"
                    className={buttonClassName({ variant: "secondary" })}
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    Avisar interesse
                  </a>
                }
              />
            </div>
          )}

          <div className="mt-10 grid gap-3 sm:grid-cols-3" data-reveal-stagger>
            {relatedSections.map((related) => {
              const Icon = related.icon;

              return (
                <Link
                  key={related.id}
                  to={related.href}
                  className="flex min-h-16 items-center justify-between gap-3 rounded-ui border border-slate-200 bg-white p-4 text-sm font-semibold text-ink transition duration-200 hover:-translate-y-0.5 hover:border-blue-100 hover:shadow-soft"
                  data-reveal
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="grid h-10 w-10 flex-none place-items-center rounded-ui bg-blue-soft text-blue-deep">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="truncate">{related.label}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 flex-none text-slate-400" aria-hidden="true" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
