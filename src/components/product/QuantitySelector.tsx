import { Minus, Plus } from "lucide-react";
import { Button } from "../ui/Button";

interface QuantitySelectorProps {
  value: number;
  min?: number;
  max: number;
  onChange: (value: number) => void;
  onLimit?: () => void;
}

export function QuantitySelector({ value, min = 1, max, onChange, onLimit }: QuantitySelectorProps) {
  const decrease = () => onChange(Math.max(min, value - 1));
  const increase = () => {
    if (value >= max) {
      onLimit?.();
      return;
    }

    onChange(Math.min(max, value + 1));
  };

  return (
    <div>
      <p className="text-sm font-semibold text-ink">Quantidade</p>
      <div className="mt-3 inline-flex h-11 items-center rounded-ui border border-slate-200 bg-white">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={decrease}
          disabled={value <= min || max <= 0}
          aria-label="Diminuir quantidade"
          className="h-10 w-10 rounded-r-none"
        >
          <Minus className="h-4 w-4" aria-hidden="true" />
        </Button>
        <output className="min-w-10 px-2 text-center text-sm font-semibold text-ink" aria-live="polite">
          {max <= 0 ? 0 : value}
        </output>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={increase}
          disabled={value >= max || max <= 0}
          aria-label="Aumentar quantidade"
          className="h-10 w-10 rounded-l-none"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
      {max > 0 ? <p className="mt-2 text-xs text-slate-500">Máximo disponível: {max}</p> : null}
    </div>
  );
}
