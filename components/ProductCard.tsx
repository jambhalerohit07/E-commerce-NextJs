"use client";

import Link from "next/link";
import { Product } from "@/types";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/cartSlice";
import { useState } from "react";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    dispatch(addToCart(product));
    setTimeout(() => setIsAdding(false), 1000);
  };

  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);

  return (
    <Link href={`/products/${product.id}`} className="block h-full">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
        <div className="relative h-48 bg-gray-100 overflow-hidden group">
          <div className="relative w-50 h-[200px]">
            <Image src={product.thumbnail} alt={product.title} fill />
          </div>
          {product.discountPercentage > 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1">
              <span>🏷️</span>
              {product.discountPercentage.toFixed(0)}% OFF
            </div>
          )}
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1">
              {product.title}
            </h3>
          </div>

          <div className="flex items-center gap-1 mb-2">
            <span className="text-yellow-400 text-sm">⭐</span>
            <span className="text-sm text-gray-600">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-xs text-gray-400 ml-1">
              ({product.stock} in stock)
            </span>
          </div>

          <p className="text-xs text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1">
            <span>🏷️</span>
            {product.category}
          </p>

          <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-1">
            {product.description}
          </p>

          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-900">
                ${discountedPrice.toFixed(2)}
              </span>
              {product.discountPercentage > 0 && (
                <span className="text-sm text-gray-400 line-through">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 text-sm md:text-base ${
                isAdding
                  ? "bg-green-500 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              } disabled:cursor-not-allowed`}
            >
              {isAdding ? (
                <>
                  <span>✓</span>
                  Added!
                </>
              ) : (
                <>
                  <span>🛒</span>
                  <span className="hidden sm:inline">Add to Cart</span>
                  <span className="sm:hidden">Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
