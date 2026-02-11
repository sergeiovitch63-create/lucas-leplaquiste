interface QuickActionsProps {
  phone?: string | null;
  whatsapp?: string | null;
  facebook?: string | null;
  email?: string | null;
  variant?: "light" | "dark";
}

function buildWhatsappFromPhone(phone: string | null | undefined): string | null {
  if (!phone) return null;
  const numeric = phone.replace(/[^\d]/g, "");
  if (!numeric) return null;
  return `https://wa.me/${numeric}`;
}

export function QuickActions({
  phone,
  whatsapp,
  facebook,
  email,
  variant = "dark",
}: QuickActionsProps) {
  const phoneHref = phone ? `tel:${phone}` : null;
  const whatsappHref = whatsapp || buildWhatsappFromPhone(phone);

  const baseBtn =
    "flex h-9 w-9 items-center justify-center rounded-full shadow-sm transition hover:translate-y-[1px]";
  const darkStyle =
    "bg-white/85 text-black hover:bg-white";
  const lightStyle =
    "bg-black/80 text-white hover:bg-black";
  const style = variant === "light" ? lightStyle : darkStyle;

  return (
    <div className="flex items-center justify-center gap-3">
      {phoneHref && (
        <a
          href={phoneHref}
          aria-label="Appeler"
          className={`${baseBtn} ${style}`}
        >
          <span aria-hidden>📞</span>
        </a>
      )}
      {whatsappHref && (
        <a
          href={whatsappHref}
          aria-label="WhatsApp"
          target="_blank"
          rel="noreferrer"
          className={`${baseBtn} ${style} text-emerald-600`}
        >
          <span aria-hidden>💬</span>
        </a>
      )}
      {facebook && (
        <a
          href={facebook}
          aria-label="Facebook"
          target="_blank"
          rel="noreferrer"
          className={`${baseBtn} ${style} text-sky-700`}
        >
          <span aria-hidden>f</span>
        </a>
      )}
      {email && (
        <a
          href={`mailto:${email}`}
          aria-label="Email"
          className={`${baseBtn} ${style} text-slate-800`}
        >
          <span aria-hidden>✉️</span>
        </a>
      )}
    </div>
  );
}


