import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

interface AccordionItemProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-slate-200">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex w-full items-center justify-between gap-4 py-4 text-left text-sm font-semibold text-ink outline-none transition hover:text-blue-brand focus-visible:ring-2 focus-visible:ring-blue-brand"
        aria-expanded={open}
      >
        {title}
        <ChevronDown className={cn("h-4 w-4 transition duration-200", open && "rotate-180")} aria-hidden="true" />
      </button>
      {open ? <div className="pb-4 text-sm leading-6 text-slate-600">{children}</div> : null}
    </div>
  );
}
