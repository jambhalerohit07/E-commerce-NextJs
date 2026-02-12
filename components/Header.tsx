"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { LogOut, Menu, ShoppingBag, ShoppingCart, X } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (pathname === "/login") {
    return null;
  }

  return (
    <header className="bg-gray-900 shadow-lg sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/products"
            className="text-lg md:text-xl font-bold text-white hover:text-blue-400 transition-colors flex items-center gap-2"
          >
            <span className="text-2xl">
              <ShoppingBag />
            </span>
            <span className="hidden sm:inline">E-Commerce Store</span>
            <span className="sm:hidden">Shop</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/products"
              className={`text-sm font-medium transition-colors hover:text-white ${
                pathname === "/products" ? "text-white" : "text-gray-300"
              }`}
            >
              Products
            </Link>

            <Link
              href="/cart"
              className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-white ${
                pathname === "/cart" ? "text-white" : "text-gray-300"
              }`}
            >
              <div className="relative">
                <span className="text-xl">
                  <ShoppingCart />
                </span>
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
              <span className="text-lg">
                <LogOut />
              </span>
              Logout
            </button>
          </nav>

          <div className="flex md:hidden items-center gap-3">
            <Link href="/cart" className="relative text-white">
              <span className="text-2xl">
                <ShoppingCart />
              </span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2 hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-800">
            <div className="py-4 space-y-3">
              <Link
                href="/products"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-2 text-base font-medium rounded-lg transition-colors ${
                  pathname === "/products"
                    ? "bg-gray-800 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className="text-xl">📦</span>
                  Products
                </span>
              </Link>

              <Link
                href="/cart"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-2 text-base font-medium rounded-lg transition-colors ${
                  pathname === "/cart"
                    ? "bg-gray-800 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className="relative inline-block">
                    <span className="text-xl">🛒</span>
                    {totalItems > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                        {totalItems}
                      </span>
                    )}
                  </span>
                  Cart {totalItems > 0 && `(${totalItems})`}
                </span>
              </Link>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full text-left px-4 py-2 text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
              >
                <span className="flex items-center gap-3">
                  <span className="text-xl">
                    <LogOut />
                  </span>
                  Logout
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
