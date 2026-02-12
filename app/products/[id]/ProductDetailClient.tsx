"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/cartSlice";
import { Product } from "@/types";
import Link from "next/link";
import Image from "next/image";

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({
  product,
}: ProductDetailClientProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    dispatch(addToCart(product));
    setTimeout(() => setIsAdding(false), 1000);
  };

  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);
  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.thumbnail];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-4 md:py-8">
        <nav className="flex items-center gap-2 text-sm mb-6 text-gray-600">
          <Link href="/products" className="hover:text-blue-600">
            Products
          </Link>
          <span>›</span>
          <span className="text-gray-900 font-medium capitalize">
            {product.category}
          </span>
          <span>›</span>
          <span className="text-gray-900 font-medium truncate max-w-[200px]">
            {product.title}
          </span>
        </nav>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4 md:p-8">
            <div className="space-y-4">
              <div className="aspect-square w-full bg-gray-100 rounded-lg overflow-hidden">
                <div className="relative w-full h-[500px]">
                  <Image
                    src={images[selectedImage]}
                    alt={product.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index
                          ? "border-blue-600"
                          : "border-transparent hover:border-gray-300"
                      }`}
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={image}
                          alt={`${product.title} ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-sm text-blue-600 font-medium uppercase mb-2">
                  {product.category}
                </p>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {product.title}
                </h1>
                <p className="text-gray-600">{product.brand}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {"⭐".repeat(Math.round(product.rating))}
                  {"☆".repeat(5 - Math.round(product.rating))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating.toFixed(1)} out of 5
                </span>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-gray-900">
                  ${discountedPrice.toFixed(2)}
                </span>
                {product.discountPercentage > 0 && (
                  <>
                    <span className="text-2xl text-gray-400 line-through">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="px-2 py-1 bg-red-100 text-red-700 text-sm font-semibold rounded">
                      {product.discountPercentage.toFixed(0)}% OFF
                    </span>
                  </>
                )}
              </div>

              <div>
                {product.stock > 0 ? (
                  <p className="text-green-600 font-medium flex items-center gap-2">
                    <span className="text-xl">✓</span>
                    In Stock ({product.stock} available)
                  </p>
                ) : (
                  <p className="text-red-600 font-medium flex items-center gap-2">
                    <span className="text-xl">✕</span>
                    Out of Stock
                  </p>
                )}
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Description
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0 || isAdding}
                  className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-colors ${
                    isAdding
                      ? "bg-green-600 text-white"
                      : "bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
                  }`}
                >
                  {isAdding ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="text-xl">✓</span>
                      Added to Cart!
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <span className="text-xl">🛒</span>
                      Add to Cart
                    </span>
                  )}
                </button>

                <Link
                  href="/cart"
                  className="block w-full py-3 px-6 border-2 border-gray-300 rounded-lg font-semibold text-center hover:border-gray-400 hover:bg-gray-50 transition-colors"
                >
                  View Cart
                </Link>

                <button
                  onClick={() => router.back()}
                  className="block w-full py-3 px-6 text-blue-600 hover:text-blue-700 font-medium text-center"
                >
                  ← Continue Shopping
                </button>
              </div>

              <div className="pt-6 border-t space-y-2">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  Product Details
                </h2>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-600">Brand:</span>
                    <span className="ml-2 font-medium text-gray-900">
                      {product.brand}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Category:</span>
                    <span className="ml-2 font-medium text-gray-900 capitalize">
                      {product.category}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Rating:</span>
                    <span className="ml-2 font-medium text-gray-900">
                      {product.rating.toFixed(1)} / 5.0
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">SKU:</span>
                    <span className="ml-2 font-medium text-gray-900">
                      #{product.id.toString().padStart(6, "0")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
