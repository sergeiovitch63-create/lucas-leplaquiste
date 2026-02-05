import type { IconKey } from "../config/site";

interface IconProps {
  name: IconKey;
  className?: string;
}

export function Icon({ name, className }: IconProps) {
  switch (name) {
    case "phone":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill="currentColor"
        >
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill="currentColor"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      );
    case "facebook":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill="currentColor"
        >
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    case "email":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill="currentColor"
        >
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      );
    case "map":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill="none"
        >
          <path
            d="M12 3.75A5.25 5.25 0 0 0 6.75 9c0 3.5 4.25 7.25 4.25 7.25.55.5 1.45.5 2 0 0 0 4.25-3.75 4.25-7.25A5.25 5.25 0 0 0 12 3.75Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="12"
            cy="9"
            r="1.75"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      );
    case "paint":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill="none"
        >
          <path
            d="M5.5 4.75h13v4.5A3.75 3.75 0 0 1 14.75 13H9.25A3.75 3.75 0 0 1 5.5 9.25v-4.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M10 13v3.25a2.75 2.75 0 1 0 5.5 0V13"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "ceiling":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill="none"
        >
          <path
            d="M4 6.75h16"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M7 10.5h10v6.75H7z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "layers":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill="none"
        >
          <path
            d="m5.5 9.25 6.5-3.5 6.5 3.5-6.5 3.5-6.5-3.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="m5.5 13.75 6.5 3.5 6.5-3.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "walls":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill="none"
        >
          <rect
            x="4"
            y="6"
            width="16"
            height="12"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M4 12h16M10 6v12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "info":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill="none"
        >
          <circle
            cx="12"
            cy="12"
            r="8"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M12 10.5V16"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="12" cy="8" r="0.75" fill="currentColor" />
        </svg>
      );
    case "stars":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill="none"
        >
          <path
            d="M12 4.75 13.5 9l4.25 1.5L13.5 12 12 16.25 10.5 12 6.25 10.5 10.5 9 12 4.75Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M6.5 16.5 7 18l1.5.5L7 19l-.5 1.5L6 19l-1.5-.5L6 18l.5-1.5Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path
            d="M17.5 15.5 18 17l1.5.5L18 18l-.5 1.5L17 18l-1.5-.5L17 17l.5-1.5Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return null;
  }
}


