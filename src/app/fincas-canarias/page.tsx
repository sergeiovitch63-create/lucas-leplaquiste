import type { Metadata } from 'next';
import FincasCanariasClient from './FincasCanariasClient';

export const metadata: Metadata = {
  title: 'Fincas Canarias | Publink',
  description:
    'Productos auténticos de las Islas Canarias. Catálogo de productos artesanales canarios.',
};

export default function FincasCanariasPage() {
  return <FincasCanariasClient />;
}
