import { NextRequest, NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { sessionOptions, SessionData } from '@/lib/session';
import { cookies } from 'next/headers';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET(request: NextRequest) {
  try {
    const session = await getIronSession<SessionData>(
      await cookies(),
      sessionOptions
    );

    if (!session.token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') || '10';
    const skip = searchParams.get('skip') || '0';
    const sortBy = searchParams.get('sortBy');
    const order = searchParams.get('order');
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    let url = '';

    if (search) {
      url = `${API_BASE}/products/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`;
    } else if (category) {
      url = `${API_BASE}/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`;
    } else {
      url = `${API_BASE}/products?limit=${limit}&skip=${skip}`;
    }

    if (sortBy && order) {
      url += `&sortBy=${sortBy}&order=${order}`;
    }

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 }, 
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch products' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Products fetch error:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching products' },
      { status: 500 }
    );
  }
}
