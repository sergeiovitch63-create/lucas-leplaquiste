import type { Metadata } from "next";
import LucasAdminClient from "@/app/admin/lucas-leplaquiste/LucasAdminClient";

export const metadata: Metadata = {
  title: "Back Office Lucas | Privé",
  description: "Administration privée de la page Lucas Le Plaquiste.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLucasStandalonePage() {
  return (
    <div className="min-h-screen bg-slate-950 px-4 py-6 text-slate-100 sm:px-6">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-6 rounded-xl border border-slate-800 bg-slate-900/80 p-4">
          <h1 className="text-lg font-semibold text-white">
            Lucas Le Plaquiste — Back office privé
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Espace séparé du back office Fincas Canarias.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-[0_18px_45px_rgba(0,0,0,0.45)] sm:p-6">
          <LucasAdminClient />
        </div>
      </div>
    </div>
  );
}

