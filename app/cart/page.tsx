"use client";

import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { removeFromCart, updateQuantity, clearCart } from "@/store/cartSlice";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  const handleQuantityChange = (productId: number, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ productId, quantity }));
    }
  };

  const handleRemove = (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      dispatch(clearCart());
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container-custom py-8 md:py-16">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
              <div className="text-6xl md:text-7xl mb-6">🛒</div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Your Cart is Empty
              </h1>
              <p className="text-gray-600 mb-8 text-sm md:text-base">
                {
                  " Looks like you haven't added any items to your cart yet. Start shopping to fill it up!"
                }
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 md:px-8 py-3 rounded-lg font-semibold transition-colors text-sm md:text-base"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-4 md:py-8">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6 md:mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 md:mb-2">
              Shopping Cart
            </h1>
            <p className="text-sm md:text-base text-gray-600">
              {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
            </p>
          </div>
          <button
            onClick={handleClearCart}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 font-medium transition-colors px-3 py-2 rounded-lg text-sm md:text-base"
          >
            <span className="text-lg">🗑️</span>
            <span className="hidden sm:inline">Clear Cart</span>
            <span className="sm:hidden">Clear</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.product.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className="md:hidden">
                  {/* <img
                    src={item.product.thumbnail}
                    alt={item.product.title}
                    className="w-full h-48 object-cover"
                  /> */}
                  <div className="w-full h-48 overflow-hidden">
                    <Image
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      width={200}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 className="text-base font-semibold text-gray-900 mb-1">
                          {item.product.title}
                        </h3>
                        <p className="text-sm text-gray-500 capitalize">
                          {item.product.category}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemove(item.product.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors ml-2"
                        title="Remove item"
                      >
                        <span className="text-2xl leading-none">×</span>
                      </button>
                    </div>

                    <p className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                      ${item.product.price.toFixed(2)}
                    </p>

                    <div className="space-y-3">
                      <div className="flex flex-col gap-2">
                        <span className="text-sm font-medium text-gray-700">
                          Quantity:
                        </span>
                        <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                          <button
                            onClick={() =>
                              handleQuantityChange(
                                item.product.id,
                                item.quantity - 1,
                              )
                            }
                            disabled={item.quantity <= 1}
                            className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-l-lg"
                          >
                            <span className="text-lg font-semibold text-gray-600">
                              −
                            </span>
                          </button>
                          <span className="px-6 py-2 font-semibold text-gray-900 min-w-[60px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(
                                item.product.id,
                                item.quantity + 1,
                              )
                            }
                            className="p-2 hover:bg-gray-100 transition-colors rounded-r-lg"
                          >
                            <span className="text-lg font-semibold text-gray-600">
                              +
                            </span>
                          </button>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                        <p className="text-sm text-gray-600">Subtotal</p>
                        <p className="text-lg font-bold text-gray-900">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hidden md:flex gap-6 p-6">
                  <div className="flex-shrink-0">
                    <div className="w-28 h-28 lg:w-32 lg:h-32 overflow-hidden">
                      <Image
                        src={item.product.thumbnail}
                        alt={item.product.title}
                        width={200}
                        height={200}
                        className="w-28 h-28 lg:w-32 lg:h-32 object-cover rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {item.product.title}
                        </h3>
                        <p className="text-sm text-gray-500 capitalize">
                          {item.product.category}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemove(item.product.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors ml-4"
                        title="Remove item"
                      >
                        <span className="text-2xl leading-none">×</span>
                      </button>
                    </div>

                    <p className="text-2xl font-bold text-gray-900 mb-4">
                      ${item.product.price.toFixed(2)}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-700">
                          Quantity:
                        </span>
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() =>
                              handleQuantityChange(
                                item.product.id,
                                item.quantity - 1,
                              )
                            }
                            disabled={item.quantity <= 1}
                            className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-l-lg"
                          >
                            <span className="text-lg font-semibold text-gray-600">
                              −
                            </span>
                          </button>
                          <span className="px-6 py-2 font-semibold text-gray-900 min-w-[60px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(
                                item.product.id,
                                item.quantity + 1,
                              )
                            }
                            className="p-2 hover:bg-gray-100 transition-colors rounded-r-lg"
                          >
                            <span className="text-lg font-semibold text-gray-600">
                              +
                            </span>
                          </button>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-sm text-gray-500 mb-1">Subtotal</p>
                        <p className="text-xl font-bold text-gray-900">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 lg:sticky lg:top-24">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm md:text-base text-gray-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="font-semibold text-gray-900">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm md:text-base text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
                <div className="flex justify-between text-sm md:text-base text-gray-600">
                  <span>Tax</span>
                  <span className="font-semibold text-gray-900">
                    At checkout
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-base md:text-lg font-semibold text-gray-900">
                    Total
                  </span>
                  <span className="text-2xl md:text-3xl font-bold text-gray-900">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 md:py-4 px-6 rounded-lg transition-colors mb-4 flex items-center justify-center gap-2 text-sm md:text-base">
                <span className="text-lg">🛒</span>
                Proceed to Checkout
              </button>

              <Link
                href="/products"
                className="block text-center text-blue-600 hover:text-blue-700 hover:underline font-medium transition-colors text-sm md:text-base"
              >
                Continue Shopping
              </Link>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="space-y-3 text-xs md:text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <span className="text-green-600 font-bold text-base">
                      ✓
                    </span>
                    <span>Free shipping on all orders</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600 font-bold text-base">
                      ✓
                    </span>
                    <span>30-day return policy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600 font-bold text-base">
                      ✓
                    </span>
                    <span>Secure checkout</span>
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
