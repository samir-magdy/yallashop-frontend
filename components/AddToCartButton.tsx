"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";

interface Product {
  id: string;
  slug: string;
  title: string;
  price: number;
  image: string;
  brand: string;
  inStock?: boolean;
}

interface AddToCartButtonProps {
  product: Product;
  variant?: "default" | "large";
}

export default function AddToCartButton({
  product,
  variant = "default",
}: AddToCartButtonProps) {
  const { addToCart, cart, setIsCartOpen } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const isInCart = cart.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    if (!product.inStock && product.inStock !== undefined) return;

    addToCart({
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      image: product.image,
      brand: product.brand,
    });

    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleViewCart = () => {
    setIsCartOpen(true);
  };

  const baseClasses =
    "w-full font-semibold rounded-lg transition-all duration-200";
  const sizeClasses = variant === "large" ? "py-4 text-lg" : "py-2 text-sm";

  const buttonClasses =
    !product.inStock && product.inStock !== undefined
      ? `${baseClasses} ${sizeClasses} bg-gray-300 text-gray-500 cursor-not-allowed`
      : isInCart
      ? `${baseClasses} ${sizeClasses} bg-white border-2 border-yallashop-yellow text-yallashop-navy hover:bg-yallashop-yellow`
      : justAdded
      ? `${baseClasses} ${sizeClasses} bg-green-500 text-white`
      : `${baseClasses} ${sizeClasses} bg-yallashop-yellow text-yallashop-navy hover:bg-yellow-500`;

  if (!product.inStock && product.inStock !== undefined) {
    return (
      <button disabled className={buttonClasses}>
        Out of Stock
      </button>
    );
  }

  if (justAdded) {
    return (
      <button className={buttonClasses}>
        <span className="flex items-center justify-center gap-2">
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
              d="M5 13l4 4L19 7"
            />
          </svg>
          Added to Cart!
        </span>
      </button>
    );
  }

  if (isInCart) {
    return (
      <button onClick={handleViewCart} className={buttonClasses}>
        <span className="flex items-center justify-center gap-2">
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
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          View in Cart
        </span>
      </button>
    );
  }

  return (
    <button onClick={handleAddToCart} className={buttonClasses}>
      <span className="flex items-center justify-center gap-2">
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
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        Add to Cart
      </span>
    </button>
  );
}
