import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-paysagiste-cormorant",
  display: "swap",
});

export default function PaysagisteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${cormorant.variable} font-sans md:[font-family:var(--font-paysagiste-cormorant)]`}>
      {children}
    </div>
  );
}
