import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  autoFocus?: boolean;
}

export function SearchBar({ value, onChange, autoFocus = false }: SearchBarProps) {
  return (
    <div className="relative min-w-0">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
      <label className="sr-only" htmlFor="catalog-search">
        Buscar produtos
      </label>
      <input
        id="catalog-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Buscar por modelo, cor ou armazenamento"
        autoFocus={autoFocus}
        className="h-12 w-full min-w-0 rounded-ui border border-slate-200 bg-white pl-10 pr-10 text-sm text-ink outline-none transition duration-200 placeholder:text-slate-400 focus:border-blue-brand focus:ring-2 focus:ring-blue-brand/15"
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-slate-500 outline-none transition hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-blue-brand"
          aria-label="Limpar busca"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );
}
