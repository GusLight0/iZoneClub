import { SearchX } from "lucide-react";
import { Link } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle";
import { EmptyState } from "../components/ui/EmptyState";
import { buttonClassName } from "../components/ui/Button";

export function NotFoundPage() {
  usePageTitle("Página não encontrada | iZone Club");

  return (
    <EmptyState
      icon={<SearchX className="h-5 w-5" aria-hidden="true" />}
      title="Página não encontrada."
      description="O link pode ter mudado ou o produto não está mais cadastrado."
      action={
        <Link to="/" className={buttonClassName({ variant: "primary" })}>
          Voltar para a loja
        </Link>
      }
    />
  );
}
