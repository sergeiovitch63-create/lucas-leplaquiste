import type { Metadata } from "next";
import Link from "next/link";
import { PhoneFrame } from "../../components/PhoneFrame";
import { GoogleReviewsWidget } from "../../components/GoogleReviewsWidget";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  icons: {
    icon: "/media/accueil/favicon-avis.png",
  },
};

export default function AvisPage() {
  return (
    <div className="relative min-h-[100dvh] w-full overflow-x-hidden bg-white">
      {/* Content */}
      <div className="relative z-20 flex min-h-[100dvh] w-full items-center justify-center px-4 pt-[calc(env(safe-area-inset-top)+3rem)] pb-[calc(env(safe-area-inset-bottom)+6rem)]">
        <PhoneFrame>
          <div className="space-y-7">
            <div className="flex items-center justify-between gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-1 text-xs font-medium text-gray-700 underline-offset-4 hover:text-gray-900 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                aria-label="Retour à la page principale"
              >
                <span aria-hidden>←</span>
                <span>Retour</span>
              </Link>
            </div>

            <div className="space-y-3">
              <h1 className="text-xl font-semibold tracking-tight text-gray-900">
                Avis clients
              </h1>
            </div>

            <div className="py-6">
              <div className="max-w-[420px] w-full mx-auto px-0">
                <GoogleReviewsWidget />
              </div>
            </div>
          </div>
        </PhoneFrame>
      </div>
    </div>
  );
}



