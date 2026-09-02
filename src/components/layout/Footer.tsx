import { Link } from "react-router-dom";
import { CONTACT_EMAIL, WHATSAPP_DISPLAY } from "../../utils/whatsapp";
import { BrandLogo } from "../ui/BrandLogo";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <BrandLogo showName size="md" />
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-600">
            E-commerce premium especializado em iPhones, com atendimento direto pelo WhatsApp.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-ink">Atendimento</h2>
          <p className="mt-3 text-sm text-slate-600">São Luís - MA</p>
          <p className="mt-1 text-sm text-slate-600">WhatsApp: {WHATSAPP_DISPLAY}</p>
          <p className="mt-1 text-sm text-slate-600">
            E-mail:{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="transition hover:text-blue-brand">
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-ink">Links</h2>
          <div className="mt-3 grid gap-2 text-sm">
            <Link to="/" className="text-slate-600 transition hover:text-blue-brand">
              Início
            </Link>
            <Link to="/iphones" className="text-slate-600 transition hover:text-blue-brand">
              iPhones
            </Link>
            <Link to="/carrinho" className="text-slate-600 transition hover:text-blue-brand">
              Carrinho
            </Link>
            <Link to="/atendimento" className="text-slate-600 transition hover:text-blue-brand">
              Atendimento
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
