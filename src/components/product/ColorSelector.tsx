import { Check } from "lucide-react";
import type { ProductColor } from "../../types/product";
import { cn } from "../../utils/cn";

interface ColorSelectorProps {
  colors: ProductColor[];
  selectedColorId: string;
  onChange: (color: ProductColor) => void;
}

export function ColorSelector({ colors, selectedColorId, onChange }: ColorSelectorProps) {
  const selectedColor = colors.find((color) => color.id === selectedColorId) ?? colors[0];

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-ink">Cor</p>
        <p className="text-sm text-slate-500">{selectedColor?.name}</p>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {colors.map((color) => {
          const selected = color.id === selectedColorId;

          return (
            <button
              key={color.id}
              type="button"
              onClick={() => onChange(color)}
              className={cn(
                "group flex min-h-11 items-center gap-2 rounded-ui border bg-white px-3 text-sm outline-none transition duration-200 hover:border-blue-brand focus-visible:ring-2 focus-visible:ring-blue-brand",
                selected ? "border-blue-brand text-blue-deep shadow-soft" : "border-slate-200 text-slate-700"
              )}
              aria-pressed={selected}
            >
              <span
                className="grid h-5 w-5 place-items-center rounded-full border border-slate-300"
                style={{ backgroundColor: color.hex }}
                aria-hidden="true"
              >
                {selected ? <Check className="h-3 w-3 text-ink drop-shadow-sm" /> : null}
              </span>
              <span>{color.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
