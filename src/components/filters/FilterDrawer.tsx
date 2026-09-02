import { X } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "../ui/Button";
import { cn } from "../../utils/cn";

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function FilterDrawer({ open, onClose, children }: FilterDrawerProps) {
  return (
    <div className={cn("fixed inset-0 z-[70] lg:hidden", open ? "pointer-events-auto" : "pointer-events-none")}>
      <button
        type="button"
        aria-label="Fechar filtros"
        className={cn(
          "absolute inset-0 bg-ink/35 transition duration-200",
          open ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />
      <aside
        className={cn(
          "absolute inset-x-0 bottom-0 max-h-[86vh] overflow-y-auto rounded-t-[8px] bg-white p-4 shadow-[0_-24px_60px_-38px_rgba(15,23,42,0.55)] transition duration-300 ease-smooth",
          open ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-ink">Filtros</h2>
          <Button type="button" variant="ghost" size="icon" onClick={onClose} aria-label="Fechar filtros">
            <X className="h-5 w-5" aria-hidden="true" />
          </Button>
        </div>
        {children}
      </aside>
    </div>
  );
}
