import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-6xl">
        {/* Sidebar */}
        <aside className="hidden w-64 flex-shrink-0 border-r border-slate-800 bg-slate-950/95 px-4 py-6 sm:flex sm:flex-col">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-sm font-semibold text-white">
              PL
            </div>
            <div>
              <div className="text-sm font-semibold text-white">
                Publink Back office
              </div>
              <div className="text-xs text-slate-400">
                Gestion des mini-sites
              </div>
            </div>
          </div>

          <nav className="space-y-1 text-sm">
            <Link
              href="/admin"
              className="flex items-center justify-between rounded-lg px-3 py-2 text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              <span>Tableau de bord</span>
            </Link>
            <Link
              href="/admin/autoaufbereitung"
              className="flex items-center justify-between rounded-lg bg-slate-800 px-3 py-2 text-white"
            >
              <span>Autoaufbereitung</span>
              <span className="rounded-full bg-slate-700 px-2 py-0.5 text-[10px] uppercase tracking-wide">
                Page
              </span>
            </Link>
          </nav>

          <div className="mt-auto pt-6 text-xs text-slate-500">
            <p className="font-medium text-slate-400">Aperçu</p>
            <p>Modifiez les blocs au centre, la prévisualisation se met à jour à droite.</p>
          </div>
        </aside>

        {/* Main content + preview, Linktree-style */}
        <main className="flex min-h-screen flex-1 flex-col bg-slate-900/95 px-4 py-6 sm:px-6">
          <header className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h1 className="text-lg font-semibold text-white">
                Autoaufbereitung — Back office
              </h1>
              <p className="text-xs text-slate-400">
                Gérez les liens, le fond et les cartes comme sur Linktree.
              </p>
            </div>
            <Link
              href="/autoaufbereitung-puerto-de-la-cruz"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-slate-600 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-100 hover:bg-slate-700"
            >
              Voir la page en direct
            </Link>
          </header>

          <div className="flex flex-1 flex-col gap-6 lg:flex-row">
            {/* Center column: forms / links list */}
            <div className="flex-1 rounded-2xl border border-slate-800 bg-slate-950/80 p-4 shadow-[0_18px_45px_rgba(0,0,0,0.45)]">
              {children}
            </div>

            {/* Right column: phone preview, format proche iPhone */}
            <div className="mt-4 flex w-full justify-center lg:mt-0 lg:w-[360px]">
              <div className="relative h-[740px] w-[360px] overflow-hidden rounded-[32px] border border-slate-700 bg-slate-950/90 shadow-[0_20px_60px_rgba(0,0,0,0.65)]">
                <div className="absolute inset-x-0 top-0 z-20 flex h-8 items-center justify-center">
                  <div className="h-6 w-32 rounded-full bg-black/80" />
                </div>
                <iframe
                  title="Prévisualisation Autoaufbereitung"
                  src="/autoaufbereitung-puerto-de-la-cruz?lang=de"
                  className="h-full w-full bg-black"
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
