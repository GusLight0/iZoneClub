import { ArrowRight, CheckCircle2, MessageCircle, PackageCheck, Smartphone, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { productSections as sectionMetadata } from "../data/productSections";
import { useCatalog } from "../contexts/CatalogContext";
import { usePageTitle } from "../hooks/usePageTitle";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { buttonClassName } from "../components/ui/Button";
import { SectionHeader } from "../components/ui/SectionHeader";
import { ProductGrid } from "../components/product/ProductGrid";
import { AccordionItem } from "../components/ui/Accordion";
import { BrandLogo } from "../components/ui/BrandLogo";
import { WHATSAPP_DISPLAY, WHATSAPP_PHONE } from "../utils/whatsapp";

export function HomePage() {
  const { products } = useCatalog();
  const iphoneProducts = products.filter(p => p.isNew && p.category === 'iPhone');
  const featuredProducts = products.filter(p => p.featured).slice(0,4);
  const newestProducts = products.filter(p => p.isNew).sort((a,b) => b.releaseOrder-a.releaseOrder).slice(0,4);
  const heroProducts = iphoneProducts.slice(0,3);
  const productSections = sectionMetadata.map(s => ({...s, products:products.filter(p => s.isPreOwned ? !p.isNew : p.isNew && p.category === s.category)}));
  usePageTitle("iZone Club");
  useScrollReveal();

  return (
    <>
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(21,94,239,0.08)_1px,transparent_1px),linear-gradient(rgba(21,94,239,0.06)_1px,transparent_1px)] bg-[size:46px_46px]" />
        <div className="relative mx-auto grid min-h-[620px] max-w-7xl content-center gap-8 px-4 py-2 sm:px-6 sm:py-8 lg:min-h-[720px] lg:grid-cols-[minmax(0,0.92fr)_minmax(420px,1fr)] lg:items-center lg:px-8">
          <div className="w-full max-w-2xl pt-6 sm:pt-10 lg:max-w-[520px] lg:pt-0" data-reveal>
            <BrandLogo showName size="lg" />
            <h1 className="mt-2 text-balance text-4xl font-semibold leading-[1.05] text-ink sm:mt-8 sm:text-5xl lg:text-6xl">
              Seu próximo Apple está <span className="text-blue-brand underline decoration-blue-brand/25 decoration-4 underline-offset-4">aqui</span>.
            </h1>
            <p className="mt-4 max-w-[320px] text-base leading-7 text-slate-600 sm:max-w-xl sm:text-lg">
              Escolha a seção, confira cor e configuração, adicione ao carrinho e finalize com atendimento direto pelo WhatsApp.
            </p>
            <div className="mt-6 grid max-w-[320px] grid-cols-1 gap-3 sm:flex sm:max-w-none sm:flex-wrap">
              <Link to="/iphones" className={buttonClassName({ variant: "primary", size: "lg", className: "w-full sm:w-auto" })}>
                Ver iPhone
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={`https://wa.me/${WHATSAPP_PHONE}`}
                target="_blank"
                rel="noreferrer"
                className={buttonClassName({ variant: "secondary", size: "lg", className: "w-full sm:w-auto" })}
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Comprar pelo WhatsApp
              </a>
            </div>
          </div>

          <div
            className="relative mx-auto h-[260px] w-full max-w-[330px] sm:h-[320px] sm:max-w-[460px] lg:mx-0 lg:h-[560px] lg:w-full lg:max-w-none"
            data-reveal
            data-reveal-delay="120"
          >
            {heroProducts.map((product, index) => (
              <img
                key={product.id}
                src={product.colors[0].images[0]}
                alt={product.name}
                width="1080"
                height="1350"
                loading={index === 0 ? "eager" : "lazy"}
                className={[
                  "absolute aspect-[4/5] rounded-ui border border-slate-200 bg-white object-contain p-1 shadow-soft transition duration-300",
                  index === 0
                    ? "bottom-0 right-1 h-[230px] sm:h-[310px] lg:right-0 lg:h-[520px] hero-stack-first hero-mobile-slide hero-mobile-slide-first"
                    : index === 1
                      ? "bottom-4 left-1 h-[170px] rotate-[-3deg] sm:h-[230px] lg:bottom-24 lg:left-0 lg:h-[340px] hero-mobile-slide hero-mobile-slide-second"
                      : "bottom-2 right-1 h-[145px] rotate-[3deg] sm:h-[210px] lg:bottom-0 lg:left-16 lg:right-auto lg:h-[300px] hero-stack-last hero-mobile-slide hero-mobile-slide-third"
                ].join(" ")}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Destaques"
            title="Produtos em evidência"
            description="Uma seleção inicial para cada seção começar organizada."
          />
          <ProductGrid products={featuredProducts} />
        </div>
      </section>

      <section id="secoes" className="border-y border-slate-200 bg-surface-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Seções"
            title="Cada tipo de produto no seu espaço"
            description="iPhone, iPad, MacBook, Apple Watch, Acessórios e Seminovos ficam separados."
          />
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3" data-reveal-stagger>
            {productSections.map((section) => {
              const Icon = section.icon;
              const product = section.products[0];
              const isPortraitImage = product?.imageAspectRatio === "portrait-3-4";

              return (
                <Link
                  key={section.id}
                  to={section.href}
                  className="group grid min-h-[260px] overflow-hidden rounded-ui border border-slate-200 bg-white transition duration-200 hover:-translate-y-0.5 hover:border-blue-100 hover:shadow-soft"
                  data-reveal
                >
                  <div className="flex items-center justify-between gap-3 border-b border-slate-100 p-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="grid h-10 w-10 flex-none place-items-center rounded-ui bg-blue-soft text-blue-deep">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <h3 className="truncate text-base font-semibold text-ink">{section.label}</h3>
                        <p className="text-xs text-slate-500">{section.products.length} produto(s)</p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 flex-none text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-blue-brand" aria-hidden="true" />
                  </div>
                  {product ? (
                    <div className="flex justify-center bg-surface-50 p-3">
                      <img
                        src={product.colors[0].images[0]}
                        alt={product.name}
                        className={[
                          isPortraitImage ? "aspect-[3/4] h-52 max-w-full object-cover" : "h-44 w-full object-contain",
                          "rounded-ui"
                        ].join(" ")}
                        loading="lazy"
                        width={isPortraitImage ? "900" : "720"}
                        height={isPortraitImage ? "1200" : "500"}
                      />
                    </div>
                  ) : null}
                  <p className="p-4 text-sm leading-6 text-slate-600">{section.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Novidades" title="Adicionados recentemente" />
          <ProductGrid products={newestProducts} />
        </div>
      </section>

      <section className="border-y border-slate-200 bg-ink px-4 py-12 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div data-reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-200">iZone Club</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Compra simples, atendimento direto.</h2>
            <p className="mt-4 text-sm leading-6 text-slate-300">
              Valores e disponibilidade são confirmados no atendimento, mantendo o processo claro até a finalização.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2" data-reveal-stagger>
            {[
              [Smartphone, "Produtos Apple"],
              [MessageCircle, "Compra pelo WhatsApp"],
              [Truck, "Entrega em São Luís"],
              [PackageCheck, "Retirada a combinar"]
            ].map(([Icon, label]) => (
              <div key={label as string} className="rounded-ui border border-white/10 bg-white/[0.04] p-4" data-reveal>
                <Icon className="h-5 w-5 text-blue-200" aria-hidden="true" />
                <p className="mt-4 text-sm font-semibold">{label as string}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <div>
            <SectionHeader eyebrow="Como comprar" title="Do produto ao WhatsApp em poucos passos" />
            <ol className="grid gap-3" data-reveal-stagger>
              {[
                "Escolha uma seção.",
                "Abra o produto.",
                "Selecione cor e opção.",
                "Adicione ao carrinho.",
                "Finalize pelo WhatsApp."
              ].map((step, index) => (
                <li
                  key={step}
                  className="flex items-center gap-3 rounded-ui border border-slate-200 bg-white p-3 text-sm text-slate-700"
                  data-reveal
                >
                  <span className="grid h-7 w-7 flex-none place-items-center rounded-full bg-blue-soft text-xs font-semibold text-blue-deep">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <div>
            <SectionHeader eyebrow="FAQ" title="Perguntas frequentes" />
            <div className="rounded-ui border border-slate-200 px-4" data-reveal>
              <AccordionItem title="A loja entrega em qual cidade?">
                A iZone Club atende inicialmente São Luís - MA, com entrega ou retirada a combinar pelo WhatsApp.
              </AccordionItem>
              <AccordionItem title="Como faço meu pedido?">
                Escolha a seção, abra o produto, selecione a opção desejada, adicione ao carrinho e finalize pelo WhatsApp.
              </AccordionItem>
              <AccordionItem title="Quais formas de pagamento estão disponíveis?">
                As opções de pagamento são confirmadas durante o atendimento pelo WhatsApp.
              </AccordionItem>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <div
          className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 rounded-ui border border-slate-200 bg-surface-50 p-6 sm:flex-row sm:items-center"
          data-reveal
        >
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold text-ink">
              <CheckCircle2 className="h-4 w-4 text-blue-brand" aria-hidden="true" />
              Atendimento via WhatsApp
            </p>
            <p className="mt-2 text-sm text-slate-600">{WHATSAPP_DISPLAY}</p>
          </div>
          <Link to="/atendimento" className={buttonClassName({ variant: "dark" })}>
            Falar com a iZone Club
          </Link>
        </div>
      </section>
    </>
  );
}
