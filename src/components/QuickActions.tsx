import { Icon } from "./icons";

interface QuickActionsProps {
  phone?: string | null;
  whatsapp?: string | null;
  facebook?: string | null;
  email?: string | null;
  variant?: "light" | "dark";
  size?: "normal" | "large";
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
  size = "normal",
}: QuickActionsProps) {
  const phoneHref = phone ? `tel:${phone}` : null;
  const whatsappHref = whatsapp || buildWhatsappFromPhone(phone);

  const circleSizeClass = size === "large" ? "h-14 w-14" : "h-9 w-9";
  const iconSizeClass = size === "large" ? "h-7 w-7" : "h-5 w-5";

  const baseBtn = [
    "flex items-center justify-center rounded-full bg-white/15 text-white shadow-sm backdrop-blur-md transition hover:bg-white/25 hover:translate-y-[1px]",
    circleSizeClass,
  ].join(" ");

  const darkStyle = "";
  const lightStyle = "";
  const style = variant === "light" ? lightStyle : darkStyle;

  return (
    <div className="flex items-center justify-center gap-3 mt-3">
      {phoneHref && (
        <a
          href={phoneHref}
          aria-label="Appeler"
          className={`${baseBtn} ${style}`}
        >
          <Icon name="phone" className={`${iconSizeClass} text-white`} />
        </a>
      )}
      {whatsappHref && (
        <a
          href={whatsappHref}
          aria-label="WhatsApp"
          target="_blank"
          rel="noreferrer"
          className={`${baseBtn} ${style}`}
        >
          <Icon name="whatsapp" className={`${iconSizeClass} text-white`} />
        </a>
      )}
      {facebook && (
        <a
          href={facebook}
          aria-label="Facebook"
          target="_blank"
          rel="noreferrer"
          className={`${baseBtn} ${style}`}
        >
          <Icon name="facebook" className={`${iconSizeClass} text-white`} />
        </a>
      )}
      {email && (
        <a
          href={`mailto:${email}`}
          aria-label="Email"
          className={`${baseBtn} ${style}`}
        >
          <Icon name="email" className={`${iconSizeClass} text-white`} />
        </a>
      )}
    </div>
  );
}
