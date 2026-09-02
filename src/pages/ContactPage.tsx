import { Mail, MapPin, MessageCircle, PackageCheck } from "lucide-react";
import { usePageTitle } from "../hooks/usePageTitle";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { buttonClassName } from "../components/ui/Button";
import { CONTACT_EMAIL, WHATSAPP_DISPLAY, WHATSAPP_PHONE } from "../utils/whatsapp";

export function ContactPage() {
  usePageTitle("Atendimento | iZone Club");
  useScrollReveal();

  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div data-reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-brand">Atendimento</p>
        <h1 className="mt-2 max-w-3xl text-3xl font-semibold leading-tight text-ink sm:text-5xl">
          Finalize sua compra com atendimento direto.
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
          A iZone Club atende inicialmente São Luís - MA. Entrega ou retirada são combinadas pelo WhatsApp, sem endereço ou taxa inventados no site.
        </p>

        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-reveal-stagger>
          {[
            [MessageCircle, "WhatsApp", WHATSAPP_DISPLAY],
            [Mail, "E-mail", CONTACT_EMAIL],
            [MapPin, "Cidade", "São Luís - MA"],
            [PackageCheck, "Recebimento", "Entrega ou retirada"]
          ].map(([Icon, title, text]) => (
            <div key={title as string} className="rounded-ui border border-slate-200 bg-white p-5" data-reveal>
              <Icon className="h-5 w-5 text-blue-brand" aria-hidden="true" />
              <h2 className="mt-4 text-sm font-semibold text-ink">{title as string}</h2>
              <p className="mt-2 text-sm text-slate-600">{text as string}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-ui border border-slate-200 bg-surface-50 p-6" data-reveal>
          <h2 className="text-xl font-semibold text-ink">Comprar pelo WhatsApp</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Você pode enviar uma mensagem direta ou montar o pedido pelo carrinho para incluir produto, cor, armazenamento e quantidade automaticamente.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <a
              href={`https://wa.me/${WHATSAPP_PHONE}`}
              target="_blank"
              rel="noreferrer"
              className={buttonClassName({ variant: "primary", size: "lg" })}
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Iniciar atendimento
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`} className={buttonClassName({ variant: "secondary", size: "lg" })}>
              <Mail className="h-4 w-4" aria-hidden="true" />
              Enviar e-mail
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
