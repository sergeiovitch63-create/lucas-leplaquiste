import Link from "next/link";

export default function AdminHomePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Back office</h1>
      <ul className="list-inside list-disc space-y-2 text-slate-300">
        <li>
          <Link
            href="/admin/autoaufbereitung"
            className="text-sky-400 hover:underline"
          >
            Gérer la page Autoaufbereitung Puerto de la Cruz
          </Link>
          — config (marque, contacts, liens) et catégories de services.
        </li>
      </ul>
    </div>
  );
}
