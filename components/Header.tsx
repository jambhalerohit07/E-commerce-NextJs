'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import { ShoppingCartIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (response.ok) {
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (pathname === '/login') {
    return null;
  }

  return (
    <header className="bg-gray-900 shadow-lg sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          <Link 
            href="/products" 
            className="text-xl font-bold text-white hover:text-blue-400 transition-colors"
          >
            🛍️ E-Commerce Store
          </Link>
          
          <nav className="flex items-center gap-6">
            <Link
              href="/products"
              className={`text-sm font-medium transition-colors hover:text-white ${
                pathname === '/products' 
                  ? 'text-white' 
                  : 'text-gray-300'
              }`}
            >
              Products
            </Link>
            
            <Link
              href="/cart"
              className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-white ${
                pathname === '/cart' 
                  ? 'text-white' 
                  : 'text-gray-300'
              }`}
            >
              <div className="relative">
                <ShoppingCartIcon className="h-6 w-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
              Cart
            </Link>
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
              Logout
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
