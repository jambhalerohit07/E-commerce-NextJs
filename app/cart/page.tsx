'use client';

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { removeFromCart, updateQuantity, clearCart } from '@/store/cartSlice';
import Link from 'next/link';
import { 
  ShoppingCartIcon, 
  TrashIcon, 
  PlusIcon, 
  MinusIcon,
  ArrowLeftIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';

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
    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch(clearCart());
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);


  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container-custom py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-lg p-12">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
                <ShoppingCartIcon className="h-12 w-12 text-gray-400" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
              <p className="text-gray-600 mb-8">
  {"Looks like you haven't added any items to your cart yet. Start shopping to fill it up!"}
</p>

              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                <ArrowLeftIcon className="h-5 w-5" />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
            <p className="text-gray-600">{totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart</p>
          </div>
          <button
            onClick={handleClearCart}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium transition-colors"
          >
            <TrashIcon className="h-5 w-5" />
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.product.id}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex gap-6">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    {/* <img
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      className="w-32 h-32 object-cover rounded-lg"
                    /> */}
                    <Image
  src={item.product.thumbnail}
                      alt={item.product.title}
  width={300}
  height={300}
  className="rounded-lg"
/>
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {item.product.title}
                        </h3>
                        <p className="text-sm text-gray-500 capitalize">
                          {item.product.category}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemove(item.product.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                        title="Remove item"
                      >
                        <XMarkIcon className="h-6 w-6" />
                      </button>
                    </div>

                    <p className="text-2xl font-bold text-gray-900 mb-4">
                      ${item.product.price.toFixed(2)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-700">Quantity:</span>
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() =>
                              handleQuantityChange(item.product.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-l-lg"
                          >
                            <MinusIcon className="h-4 w-4 text-gray-600" />
                          </button>
                          <span className="px-6 py-2 font-semibold text-gray-900 min-w-[60px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(item.product.id, item.quantity + 1)
                            }
                            className="p-2 hover:bg-gray-100 transition-colors rounded-r-lg"
                          >
                            <PlusIcon className="h-4 w-4 text-gray-600" />
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

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span className="font-semibold">Calculated at checkout</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total</span>
                  <span className="text-3xl font-bold text-gray-900">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors mb-4 flex items-center justify-center gap-2">
                <ShoppingCartIcon className="h-5 w-5" />
                Proceed to Checkout
              </button>

              <Link
                href="/products"
                className="block text-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Continue Shopping
              </Link>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Free shipping on all orders</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>30-day return policy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
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
