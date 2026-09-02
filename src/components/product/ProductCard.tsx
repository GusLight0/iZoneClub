import { Heart, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef } from "react";
import type { Product } from "../../types/product";
import { useCart } from "../../contexts/CartContext";
import { useFavorites } from "../../contexts/FavoritesContext";
import { useToast } from "../../contexts/ToastContext";
import { buttonClassName, Button } from "../ui/Button";
import { PriceDisplay } from "../ui/PriceDisplay";
import { StockBadge } from "../ui/StockBadge";
import { cn } from "../../utils/cn";
import { getFirstAvailableVariant, getLowestPrice, getProductAvailability, getTotalStock } from "../../utils/stock";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const mediaRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const motionRef = useRef({ tiltX: 0, tiltY: 0, parallaxX: 0, parallaxY: 0 });
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { showToast } = useToast();
  const availability = getProductAvailability(product);
  const totalStock = getTotalStock(product);
  const firstAvailable = getFirstAvailableVariant(product);
  const image = firstAvailable?.color.images[0] ?? product.colors[0]?.images[0];
  const favorite = isFavorite(product.slug);

  function applyImageMotion() {
    frameRef.current = null;
    const media = mediaRef.current;
    if (!media) return;

    const { tiltX, tiltY, parallaxX, parallaxY } = motionRef.current;
    media.style.setProperty("--product-tilt-x", `${tiltX}deg`);
    media.style.setProperty("--product-tilt-y", `${tiltY}deg`);
    media.style.setProperty("--product-parallax-x", `${parallaxX}px`);
    media.style.setProperty("--product-parallax-y", `${parallaxY}px`);
  }

  function scheduleImageMotion() {
    if (frameRef.current === null) {
      frameRef.current = window.requestAnimationFrame(applyImageMotion);
    }
  }

  function handleMediaPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || !mediaRef.current) return;

    const bounds = mediaRef.current.getBoundingClientRect();
    const normalizedX = (event.clientX - bounds.left) / bounds.width * 2 - 1;
    const normalizedY = (event.clientY - bounds.top) / bounds.height * 2 - 1;

    motionRef.current = {
      tiltX: normalizedY * -3,
      tiltY: normalizedX * 3,
      parallaxX: normalizedX * 5,
      parallaxY: normalizedY * 3
    };
    mediaRef.current.style.setProperty("--product-pointer-x", `${(normalizedX + 1) * 50}%`);
    mediaRef.current.style.setProperty("--product-pointer-y", `${(normalizedY + 1) * 50}%`);
    scheduleImageMotion();
  }

  function handleMediaPointerLeave() {
    motionRef.current = { tiltX: 0, tiltY: 0, parallaxX: 0, parallaxY: 0 };
    scheduleImageMotion();
  }

  function handleAdd() {
    if (!firstAvailable || firstAvailable.variant.stock <= 0) {
      showToast("Produto sem estoque no momento.", "error");
      return;
    }

    const result = addItem({
      product,
      color: firstAvailable.color,
      variant: firstAvailable.variant,
      image,
      quantity: 1
    });

    showToast(result.message, result.ok ? "success" : "info");
  }

  function handleFavorite() {
    const active = toggleFavorite(product.slug);
    showToast(active ? "Favorito adicionado." : "Favorito removido.", "success");
  }

  return (
    <article
      className="group flex h-full min-w-0 flex-col overflow-hidden rounded-ui border border-slate-200 bg-white shadow-[0_1px_0_rgba(15,23,42,0.04)] transition duration-200 ease-smooth hover:-translate-y-0.5 hover:border-blue-100 hover:shadow-soft"
      data-reveal
    >
      <div
        ref={mediaRef}
        className="product-card-media relative min-w-0 overflow-hidden rounded-t-ui bg-surface-50"
        onPointerMove={handleMediaPointerMove}
        onPointerLeave={handleMediaPointerLeave}
      >
        <div className="aspect-[4/5]">
          <Link to={`/produto/${product.slug}`} className="relative z-[1] block h-full" aria-label={`Ver detalhes de ${product.name}`}>
            <img
              src={image}
              alt={product.name}
              className="product-card-image h-full w-full object-contain p-1.5 transition duration-500 ease-smooth sm:p-2"
              loading="lazy"
              width="1080"
              height="1350"
            />
          </Link>
        </div>
        <button
          type="button"
          onClick={handleFavorite}
          className={cn(
            "absolute right-2 top-2 hidden h-8 w-8 place-items-center rounded-full border bg-white/95 text-slate-700 shadow-sm outline-none transition hover:border-blue-brand hover:text-blue-brand focus-visible:ring-2 focus-visible:ring-blue-brand sm:right-3 sm:top-3 sm:grid sm:h-10 sm:w-10",
            favorite && "border-blue-brand text-blue-brand"
          )}
          aria-label={favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          aria-pressed={favorite}
        >
          <Heart className={cn("h-4 w-4", favorite && "fill-current")} aria-hidden="true" />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-2.5 sm:p-4">
        <div className="flex items-start justify-between gap-2 sm:gap-3">
          <div className="min-w-0">
            <h3 className="line-clamp-2 break-words text-sm font-semibold leading-tight text-ink sm:text-base">
              <Link to={`/produto/${product.slug}`} className="outline-none transition hover:text-blue-brand focus-visible:ring-2 focus-visible:ring-blue-brand">
                {product.name}
              </Link>
            </h3>
          </div>
          {product.isNew ? <span className="rounded-full bg-blue-soft px-2 py-1 text-[11px] font-semibold text-blue-deep sm:text-xs">Novo</span> : null}
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 sm:mt-4 sm:gap-3">
          <StockBadge label={availability} stock={totalStock} />
          <div className="hidden -space-x-1 sm:flex">
            {product.colors.slice(0, 3).map((color) => (
              <span
                key={color.id}
                className="h-5 w-5 rounded-full border-2 border-white ring-1 ring-slate-200"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        <div className="mt-2.5 sm:mt-4">
          <PriceDisplay price={getLowestPrice(product)} estimated={product.priceIsEstimated} />
        </div>

        <div className="mt-3 grid grid-cols-1 gap-2 sm:mt-5 2xl:grid-cols-2">
          <Link
            to={`/produto/${product.slug}`}
            className={buttonClassName({ variant: "secondary", size: "sm", className: "w-full min-w-0" })}
          >
            Detalhes
          </Link>
          <Button
            type="button"
            onClick={handleAdd}
            disabled={totalStock <= 0}
            variant="primary"
            size="sm"
            className="hidden w-full min-w-0 sm:inline-flex"
          >
            <ShoppingBag className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
            Adicionar
          </Button>
        </div>
      </div>
    </article>
  );
}
