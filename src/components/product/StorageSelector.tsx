import type { ProductVariant, StorageOption } from "../../types/product";
import { cn } from "../../utils/cn";
import { formatCurrency } from "../../utils/currency";

interface StorageSelectorProps {
  variants: ProductVariant[];
  selectedStorage: StorageOption;
  onChange: (variant: ProductVariant) => void;
}

export function StorageSelector({ variants, selectedStorage, onChange }: StorageSelectorProps) {
  return (
    <div>
      <p className="text-sm font-semibold text-ink">Armazenamento</p>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {variants.map((variant) => {
          const selected = variant.storage === selectedStorage;
          const unavailable = variant.stock <= 0;

          return (
            <button
              key={variant.storage}
              type="button"
              onClick={() => onChange(variant)}
              disabled={unavailable}
              className={cn(
                "min-h-[58px] rounded-ui border px-3 py-2 text-left outline-none transition duration-200 focus-visible:ring-2 focus-visible:ring-blue-brand disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400",
                selected && !unavailable
                  ? "border-blue-brand bg-blue-soft text-blue-deep"
                  : "border-slate-200 bg-white text-slate-700 hover:border-blue-brand"
              )}
              aria-pressed={selected}
            >
              <span className="block text-sm font-semibold">{variant.storage}</span>
              <span className="mt-1 block text-xs text-slate-500">
                {unavailable ? "Sem estoque" : formatCurrency(variant.price)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
