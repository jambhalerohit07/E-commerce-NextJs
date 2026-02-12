import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions, SessionData } from '@/lib/session';
import ProductDetailClient from './ProductDetailClient';
import Loading from '@/components/Loading';
import { notFound } from 'next/navigation';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

async function getProduct(token: string, id: string) {
  const response = await fetch(`${API_BASE}/products/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );

  if (!session.token) {
    redirect('/login');
  }

  const { id } = await params;
  const product = await getProduct(session.token, id);

  if (!product) {
    notFound();
  }

  return (
    <Suspense fallback={<Loading />}>
      <ProductDetailClient product={product} />
    </Suspense>
  );
}
