import type { Metadata } from 'next';
import FincasCanariasClient from './FincasCanariasClient';
import products from '../../../data/fincas-canarias-products.json';
import carousel from '../../../data/fincas-canarias-carousel.json';
import type { Product } from './data';

export const metadata: Metadata = {
  title: 'Fincas Canarias | Publink',
  description:
    'Productos auténticos de las Islas Canarias. Catálogo de productos artesanales canarios.',
};

export const dynamic = 'force-static';

export default function FincasCanariasPage() {
  return (
    <FincasCanariasClient
      initialProducts={products as Product[]}
      initialCarousel={carousel as { title: Record<string, string>; description: Record<string, string>; items: Array<{ id: number; img: string | null; name: Record<string, string>; description: Record<string, string>; order: number }> }}
    />
  );
}
