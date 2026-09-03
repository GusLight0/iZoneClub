import { ArrowRight, MessageCircle, PackageOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { preOwnedProducts } from "../data/preOwned";
import { usePageTitle } from "../hooks/usePageTitle";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { ProductGrid } from "../components/product/ProductGrid";
import { buttonClassName } from "../components/ui/Button";
import { EmptyState } from "../components/ui/EmptyState";
import { WHATSAPP_PHONE } from "../utils/whatsapp";

export function SeminovosPage() {
  usePageTitle("Seminovos | iZone Club");
  useScrollReveal();

  return (
    <>
      <section className="border-b border-slate-200 bg-surface-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div data-reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-brand">Seminovos</p>
            <h1 className="mt-2 text-balance text-3xl font-semibold text-ink sm:text-4xl">
              Produtos Apple seminovos.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Ainda não temos itens seminovos cadastrados. Quando houver unidades disponíveis, elas aparecem aqui com
              estoque, preço e atendimento direto.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-ui border border-dashed border-slate-300 bg-white" data-reveal>
            {preOwnedProducts.length ? (
              <div className="p-4 sm:p-5">
                <ProductGrid products={preOwnedProducts} />
              </div>
            ) : (
              <EmptyState
                icon={<PackageOpen className="h-5 w-5" aria-hidden="true" />}
                title="Nenhum seminovo disponível no momento."
                description="A seção fica vazia por enquanto e será preenchida quando entrarem unidades seminovas no estoque."
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
            )}
          </div>

          <div className="mt-8" data-reveal>
            <Link to="/iphones" className={buttonClassName({ variant: "dark" })}>
              Ver iPhones novos
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
