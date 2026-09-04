import { ChevronLeft, ChevronRight, Minus, Plus, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/Button";
import { cn } from "../../utils/cn";
import type { ProductImageAspectRatio } from "../../types/product";

interface ProductGalleryProps {
  images: string[];
  productName: string;
  colorName: string;
  imageAspectRatio?: ProductImageAspectRatio;
}

export function ProductGallery({ images, productName, colorName, imageAspectRatio = "default" }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [zoom, setZoom] = useState(1.4);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const isPortraitImage = imageAspectRatio === "portrait-3-4";
  const imageSize = isPortraitImage ? { width: "900", height: "1200" } : { width: "1080", height: "1350" };

  useEffect(() => {
    setActiveIndex(0);
  }, [images]);

  const activeImage = images[activeIndex] ?? images[0];

  function goTo(index: number) {
    const last = images.length - 1;
    if (index < 0) setActiveIndex(last);
    else if (index > last) setActiveIndex(0);
    else setActiveIndex(index);
  }

  function handleTouchEnd(clientX: number) {
    if (touchStart === null || images.length <= 1) return;
    const distance = touchStart - clientX;

    if (Math.abs(distance) > 38) {
      goTo(activeIndex + (distance > 0 ? 1 : -1));
    }

    setTouchStart(null);
  }

  return (
    <>
      <div className="product-gallery" data-reveal>
        <div
          className={cn(
            "group relative overflow-hidden rounded-ui border border-slate-200 bg-surface-50",
            isPortraitImage ? "aspect-[3/4]" : "aspect-[4/3] sm:aspect-[4/5]"
          )}
          onTouchStart={(event) => setTouchStart(event.touches[0].clientX)}
          onTouchEnd={(event) => handleTouchEnd(event.changedTouches[0].clientX)}
        >
          <img
            key={activeImage}
            src={activeImage}
            alt={`${productName} na cor ${colorName}`}
            className={cn(
              "h-full w-full transition duration-300 ease-smooth group-hover:scale-[1.015]",
              isPortraitImage ? "object-cover" : "object-contain p-2"
            )}
            loading="eager"
            width={imageSize.width}
            height={imageSize.height}
          />
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => setZoomOpen(true)}
            className="absolute right-3 top-3 bg-white/95"
          >
            <Search className="h-4 w-4" aria-hidden="true" />
            Zoom
          </Button>
          {images.length > 1 ? (
            <>
              <Button
                type="button"
                variant="secondary"
                size="icon"
                onClick={() => goTo(activeIndex - 1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/95"
                aria-label="Imagem anterior"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="icon"
                onClick={() => goTo(activeIndex + 1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/95"
                aria-label="Próxima imagem"
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </>
          ) : null}
        </div>

        {images.length > 1 ? (
          <div className="mt-3 grid grid-cols-4 gap-2">
            {images.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => goTo(index)}
                className={cn(
                  "overflow-hidden rounded-ui border bg-white outline-none transition focus-visible:ring-2 focus-visible:ring-blue-brand",
                  isPortraitImage ? "aspect-[3/4]" : "aspect-[4/5] p-1",
                  index === activeIndex ? "border-blue-brand" : "border-slate-200 hover:border-blue-brand"
                )}
                aria-label={`Selecionar imagem ${index + 1}`}
              >
                <img
                  src={image}
                  alt=""
                  className={cn("h-full w-full", isPortraitImage ? "object-cover" : "object-contain")}
                  loading="lazy"
                  width={isPortraitImage ? "120" : "160"}
                  height={isPortraitImage ? "160" : "200"}
                />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {zoomOpen ? (
        <div
          className="fixed inset-0 z-[90] flex flex-col bg-white/98 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`Zoom de ${productName}`}
        >
          <div className="flex min-h-16 items-center justify-between border-b border-slate-200 px-4">
            <div>
              <p className="text-sm font-semibold text-ink">{productName}</p>
              <p className="text-xs text-slate-500">{colorName}</p>
            </div>
            <Button type="button" variant="ghost" size="icon" onClick={() => setZoomOpen(false)} aria-label="Fechar zoom">
              <X className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>
          <div className="flex flex-1 items-center justify-center overflow-auto bg-surface-50 p-4">
            <img
              src={activeImage}
              alt={`${productName} ampliado na cor ${colorName}`}
              className="max-h-none max-w-none origin-center transition duration-200"
              style={{ transform: `scale(${zoom})`, width: "min(76vw, 560px)" }}
            />
          </div>
          <div className="flex min-h-16 items-center justify-center gap-3 border-t border-slate-200 bg-white px-4">
            <Button
              type="button"
              variant="secondary"
              size="icon"
              onClick={() => setZoom((current) => Math.max(1, Number((current - 0.2).toFixed(1))))}
              aria-label="Diminuir zoom"
            >
              <Minus className="h-4 w-4" aria-hidden="true" />
            </Button>
            <label className="sr-only" htmlFor="zoom-range">
              Intensidade do zoom
            </label>
            <input
              id="zoom-range"
              type="range"
              min="1"
              max="3"
              step="0.1"
              value={zoom}
              onChange={(event) => setZoom(Number(event.target.value))}
              className="w-[min(46vw,260px)] accent-blue-brand"
            />
            <Button
              type="button"
              variant="secondary"
              size="icon"
              onClick={() => setZoom((current) => Math.min(3, Number((current + 0.2).toFixed(1))))}
              aria-label="Aumentar zoom"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
}
