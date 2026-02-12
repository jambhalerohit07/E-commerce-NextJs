"use client";

import { Product } from "@/types";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/cartSlice";
import { useState } from "react";
import {
  ShoppingCartIcon,
  CheckIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import { TagIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    dispatch(addToCart(product));
    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <div className="relative h-48 bg-gray-100 overflow-hidden group">
        {/* <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        /> */}

        {/* <Image
          src={product.thumbnail}
          alt={product.title}
          // className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          width={"100"}
          height={"100"}
        /> */}
        {/* <div className="relative w-full h-[400px]">
          <Image
            src={product.thumbnail}
            alt={product.title}
            // fill
            className="object-contain"
          />
        </div> */}
        <div className="relative w-full h-[200px]">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="w-full h-full"
          />
        </div>
        {product.discountPercentage > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1">
            <TagIcon className="h-3 w-3" />
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
          <StarIcon className="h-4 w-4 text-yellow-400" />
          <span className="text-sm text-gray-600">
            {product.rating.toFixed(1)}
          </span>
          <span className="text-xs text-gray-400 ml-1">
            ({product.stock} in stock)
          </span>
        </div>

        <p className="text-xs text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1">
          <TagIcon className="h-3 w-3" />
          {product.category}
        </p>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-1">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              isAdding
                ? "bg-green-500 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            } disabled:cursor-not-allowed`}
          >
            {isAdding ? (
              <>
                <CheckIcon className="h-5 w-5" />
                Added!
              </>
            ) : (
              <>
                <ShoppingCartIcon className="h-5 w-5" />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
