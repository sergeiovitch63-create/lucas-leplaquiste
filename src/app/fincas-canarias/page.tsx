import type { Metadata } from 'next';
import FincasCanariasClient from './FincasCanariasClient';

const title = 'Fincas Canarias';
const description =
  'Productos auténticos de las Islas Canarias. Catálogo de productos artesanales canarios.';

export const metadata: Metadata = {
  title: `${title} | Publink`,
  description,
  openGraph: {
    title,
    description,
    type: 'website',
    siteName: title,
    // On garde l'image OG globale (/og) pour ne pas casser les liens existants,
    // mais le texte affiché (titre, description, nom du site) sera bien Fincas Canarias.
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export default function FincasCanariasPage() {
  return <FincasCanariasClient />;
}
