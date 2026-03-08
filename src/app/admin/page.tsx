import Link from "next/link";

export default function AdminHomePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Back office</h1>
      <ul className="list-inside list-disc space-y-2 text-slate-300">
        <li>
          <Link
            href="/admin/fincas-canarias"
            className="text-sky-400 hover:underline"
          >
            Gérer les produits Fincas Canarias
          </Link>
          — gestion complète des produits, catégories, images et descriptions multilingues.
        </li>
      </ul>
    </div>
  );
}
