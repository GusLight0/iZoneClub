import { ArrowLeft, Heart, MessageCircle, Share2, ShoppingBag } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { getProductBySlug } from "../data/catalog";
import { getProductSectionForProduct } from "../data/productSections";
import type { ProductColor, ProductVariant, StorageOption } from "../types/product";
import { useCart } from "../contexts/CartContext";
import { useFavorites } from "../contexts/FavoritesContext";
import { useToast } from "../contexts/ToastContext";
import { usePageTitle } from "../hooks/usePageTitle";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { ProductGallery } from "../components/product/ProductGallery";
import { ColorSelector } from "../components/product/ColorSelector";
import { StorageSelector } from "../components/product/StorageSelector";
import { QuantitySelector } from "../components/product/QuantitySelector";
import { StockBadge } from "../components/ui/StockBadge";
import { PriceDisplay } from "../components/ui/PriceDisplay";
import { Button, buttonClassName } from "../components/ui/Button";
import { AccordionItem } from "../components/ui/Accordion";
import { createProductWhatsAppUrl } from "../utils/whatsapp";
import { getAvailabilityFromStock, getFirstAvailableVariant, getVariant, isVariantAvailable } from "../utils/stock";
import { cn } from "../utils/cn";

export function ProductPage() {
  const { slug } = useParams();
  const product = slug ? getProductBySlug(slug) : undefined;
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { showToast } = useToast();

  const firstAvailable = product ? getFirstAvailableVariant(product) : undefined;
  const [selectedColorId, setSelectedColorId] = useState(firstAvailable?.color.id ?? "");
  const [selectedStorage, setSelectedStorage] = useState<StorageOption>(firstAvailable?.variant.storage ?? "128GB");
  const [quantity, setQuantity] = useState(1);

  usePageTitle(product ? `${product.name} | iZone Club` : "Produto não encontrado | iZone Club");
  useScrollReveal();

  useEffect(() => {
    if (!product || !firstAvailable) return;
    setSelectedColorId(firstAvailable.color.id);
    setSelectedStorage(firstAvailable.variant.storage);
    setQuantity(1);
  }, [product?.slug]);

  const selectedColor = useMemo<ProductColor | undefined>(
    () => product?.colors.find((color) => color.id === selectedColorId) ?? product?.colors[0],
    [product, selectedColorId]
  );
  const selectedVariant = selectedColor ? getVariant(selectedColor, selectedStorage) : undefined;
  const available = isVariantAvailable(selectedVariant);
  const stock = selectedVariant?.stock ?? 0;

  useEffect(() => {
    setQuantity((current) => Math.max(1, Math.min(current, Math.max(stock, 1))));
  }, [stock]);

  if (!product || !selectedColor || !selectedVariant) {
    return (
      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-blue-brand"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Voltar
          </button>
          <h1 className="text-3xl font-semibold text-ink">Produto não encontrado.</h1>
          <Link to="/iphones" className={buttonClassName({ variant: "primary", className: "mt-6" })}>
            Ver seções
          </Link>
        </div>
      </section>
    );
  }

  const activeProduct = product;
  const activeColor = selectedColor;
  const activeVariant = selectedVariant;
  const activeSection = getProductSectionForProduct(activeProduct);
  const favorite = isFavorite(activeProduct.slug);

  function handleColorChange(color: ProductColor) {
    const nextVariant = color.variants.find((variant) => variant.stock > 0) ?? color.variants[0];
    setSelectedColorId(color.id);
    setSelectedStorage(nextVariant.storage);
    setQuantity(1);
  }

  function handleStorageChange(variant: ProductVariant) {
    setSelectedStorage(variant.storage);
    setQuantity(1);
  }

  function handleAdd() {
    if (!available) {
      showToast("Esta configuração está sem estoque.", "error");
      return;
    }

    const result = addItem({
      product: activeProduct,
      color: activeColor,
      variant: activeVariant,
      image: activeColor.images[0],
      quantity
    });

    showToast(result.message, result.ok ? "success" : "info");
  }

  function handleFavorite() {
    const active = toggleFavorite(activeProduct.slug);
    showToast(active ? "Favorito adicionado." : "Favorito removido.", "success");
  }

  async function handleShare() {
    const shareData = {
      title: activeProduct.name,
      text: `Confira o ${activeProduct.name} na iZone Club.`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      await navigator.clipboard.writeText(shareData.url);
      showToast("Link do produto copiado.", "success");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      showToast("Não foi possível compartilhar agora.", "error");
    }
  }

  const whatsappUrl = createProductWhatsAppUrl(activeProduct, activeColor, activeVariant, quantity);

  return (
    <section className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-5 flex items-center gap-2 text-sm text-slate-500" aria-label="Breadcrumb">
          <Link to="/" className="transition hover:text-blue-brand">
            Início
          </Link>
          <span>/</span>
          {activeSection ? (
            <>
              <Link to={activeSection.href} className="transition hover:text-blue-brand">
                {activeSection.label}
              </Link>
              <span>/</span>
            </>
          ) : null}
          <span className="text-slate-700">{product.name}</span>
        </nav>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-blue-brand"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Voltar
        </button>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(360px,0.72fr)] lg:items-start">
          <div className="mx-auto w-full max-w-[540px] lg:max-w-none">
            <ProductGallery
              images={selectedColor.images}
              productName={product.name}
              colorName={selectedColor.name}
              imageAspectRatio={product.imageAspectRatio}
            />
          </div>

          <div className="lg:sticky lg:top-6" data-reveal data-reveal-delay="120">
            <div className="flex flex-wrap items-center gap-2">
              <StockBadge label={getAvailabilityFromStock(stock)} stock={stock} />
              {product.isNew ? <span className="rounded-full bg-blue-soft px-2.5 py-1 text-xs font-semibold text-blue-deep">Novo</span> : null}
            </div>

            <div className="mt-4 flex items-start justify-between gap-3">
              <h1 className="text-3xl font-semibold leading-tight text-ink sm:text-4xl">{product.name}</h1>
              <div className="flex flex-none items-center gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={handleShare}
                  aria-label={`Compartilhar ${activeProduct.name}`}
                  title="Compartilhar produto"
                  className="text-slate-600 hover:bg-blue-soft hover:text-blue-deep"
                >
                  <Share2 className="h-5 w-5" aria-hidden="true" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={handleFavorite}
                  aria-label={favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                  aria-pressed={favorite}
                  title={favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                  className={cn(
                    "text-slate-600 hover:bg-blue-soft hover:text-blue-deep",
                    favorite && "text-blue-brand hover:text-blue-brand"
                  )}
                >
                  <Heart className={cn("h-5 w-5", favorite && "fill-current")} aria-hidden="true" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={handleAdd}
                  disabled={!available}
                  aria-label="Adicionar ao carrinho"
                  title="Adicionar ao carrinho"
                  className="text-slate-600 hover:bg-blue-soft hover:text-blue-deep"
                >
                  <ShoppingBag className="h-5 w-5" aria-hidden="true" />
                </Button>
              </div>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">{product.description}</p>

            <div className="mt-5 rounded-ui border border-slate-200 bg-surface-50 p-4">
              <PriceDisplay price={selectedVariant.price} estimated={product.priceIsEstimated} prefix="Preço" />
              <p className="mt-2 text-xs leading-5 text-slate-500">
                Valores e disponibilidade sujeitos à confirmação no atendimento.
              </p>
            </div>

            <div className="mt-6 grid gap-6">
              <ColorSelector colors={product.colors} selectedColorId={selectedColor.id} onChange={handleColorChange} />
              <StorageSelector
                variants={selectedColor.variants}
                selectedStorage={selectedVariant.storage}
                onChange={handleStorageChange}
                label={product.variantLabel}
              />
              <QuantitySelector
                value={quantity}
                max={stock}
                onChange={setQuantity}
                onLimit={() => showToast(`Quantidade máxima disponível: ${stock}.`, "info")}
              />
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <Button type="button" onClick={handleAdd} disabled={!available}>
                <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                Adicionar ao carrinho
              </Button>
              <a
                href={available ? whatsappUrl : undefined}
                target="_blank"
                rel="noreferrer"
                aria-disabled={!available}
                className={buttonClassName({
                  variant: "secondary",
                  className: !available ? "pointer-events-none opacity-50" : undefined
                })}
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Comprar pelo WhatsApp
              </a>
            </div>

            <div className="mt-8 rounded-ui border border-slate-200 px-4">
              <AccordionItem title="Entrega e retirada" defaultOpen>
                Entrega em São Luís ou retirada a combinar pelo WhatsApp. Nenhum endereço ou taxa é definido antes do atendimento.
              </AccordionItem>
              <AccordionItem title="Trocas e garantia">
                Esta área está preparada para as políticas futuras da loja e deve ser revisada antes da publicação.
              </AccordionItem>
              <AccordionItem title="Como adicionar novas opções">
                Cadastre a nova opção no arquivo de dados da seção, incluindo imagens reais, estoque e preço.
              </AccordionItem>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
