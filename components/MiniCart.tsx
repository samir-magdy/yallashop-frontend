"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";

export default function MiniCart() {
  const {
    cart,
    cartTotal,
    cartCount,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col animate-slide-in">
        {/* Header */}
        <div className="bg-yallashop-navy text-white p-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">Shopping Cart ({cartCount})</h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="hover:text-yallashop-yellow"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <svg
                className="w-24 h-24 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <p className="text-lg font-medium">Your cart is empty</p>
              <p className="text-sm mt-2">Add items to get started</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-4 bg-yallashop-yellow text-yallashop-navy px-6 py-2 rounded-lg font-semibold hover:bg-yallashop-yellow-light"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 border-b pb-4">
                  <div className="relative w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${item.slug}`}
                      onClick={() => setIsCartOpen(false)}
                      className="text-sm font-medium hover:text-yallashop-yellow line-clamp-2"
                    >
                      {item.title}
                    </Link>
                    <p className="text-xs text-gray-500 mt-1">{item.brand}</p>
                    <p className="text-lg font-bold text-yallashop-navy mt-1">
                      EGP {item.price.toFixed(2)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border rounded-lg">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="px-3 py-1 hover:bg-gray-100 text-gray-600"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 border-x">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-3 py-1 hover:bg-gray-100 text-gray-600"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-600 text-sm"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer - Total & Checkout */}
        {cart.length > 0 && (
          <div className="border-t p-4 bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold">Subtotal:</span>
              <span className="text-2xl font-bold text-yallashop-navy">
                EGP {cartTotal.toFixed(2)}
              </span>
            </div>
            <button className="w-full bg-yallashop-yellow text-yallashop-navy py-3 rounded-lg font-bold text-lg hover:bg-yallashop-yellow-light mb-2">
              Proceed to Checkout
            </button>
            <button
              onClick={() => setIsCartOpen(false)}
              className="w-full bg-white border-2 border-yallashop-navy text-yallashop-navy py-2 rounded-lg font-semibold hover:bg-gray-50"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
