import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sl74-cormorant",
  display: "swap",
});

export default function PlombierLyonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${cormorant.variable} font-sans md:font-sl74-cormorant`}>
      {children}
    </div>
  );
}

