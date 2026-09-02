import type { AvailabilityLabel } from "../../types/product";
import { cn } from "../../utils/cn";

interface StockBadgeProps {
  label: AvailabilityLabel;
  stock?: number;
}

export function StockBadge({ label, stock }: StockBadgeProps) {
  const tone =
    label === "Disponível"
      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
      : label === "Poucas unidades"
        ? "border-amber-200 bg-amber-50 text-amber-800"
        : "border-slate-200 bg-slate-100 text-slate-600";

  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-[11px] font-medium sm:px-2.5 sm:text-xs", tone)}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      {label}
      {stock && stock > 0 && stock <= 2 ? `: ${stock}` : null}
    </span>
  );
}
