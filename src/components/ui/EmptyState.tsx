import type { ReactNode } from "react";

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="mx-auto flex w-full max-w-md min-w-0 flex-col items-center px-4 py-14 text-center">
      <div className="mb-4 rounded-full border border-blue-100 bg-blue-soft p-3 text-blue-deep">{icon}</div>
      <h2 className="text-xl font-semibold text-ink">{title}</h2>
      <p className="mt-2 max-w-full break-words text-sm leading-6 text-slate-600">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
