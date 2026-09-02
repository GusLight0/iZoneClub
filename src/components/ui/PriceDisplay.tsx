import { formatCurrency } from "../../utils/currency";

interface PriceDisplayProps {
  price: number;
  estimated?: boolean;
  prefix?: string;
}

export function PriceDisplay({ price, estimated, prefix = "A partir de" }: PriceDisplayProps) {
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-slate-500 sm:text-xs">
        {estimated ? "Preço" : prefix}
      </p>
      <p className="mt-1 text-lg font-semibold text-ink sm:text-xl">{formatCurrency(price)}</p>
    </div>
  );
}
