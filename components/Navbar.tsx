"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import CartButton from "./CartButton";
import MiniCart from "./MiniCart";
import products from "@/data/products.json";

interface Product {
  id: string;
  slug: string;
  title: string;
  brand: string;
  price: number;
  category: string;
  subcategory: string;
  image: string;
  description: string;
  rating: number;
  reviews: number;
  inStock: boolean;
}

export default function Navbar() {
  // State to track search query
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Filter suggestions based on search query
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const filtered = products
        .filter(
          (p) =>
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 8); // Limit to 8 suggestions
      setSuggestions(filtered);
      setShowSuggestions(true);
      setSelectedIndex(-1);
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
    }
  }, [searchQuery]);

  // Click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handler for selecting a suggestion
  const handleSuggestionClick = (product: Product) => {
    setSearchQuery("");
    setShowSuggestions(false);
    setSelectedIndex(-1);
    router.push(`/products/${product.slug}`);
  };

  // Handler for search submission
  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    // If a suggestion is selected, navigate to that product
    if (selectedIndex >= 0 && suggestions[selectedIndex]) {
      handleSuggestionClick(suggestions[selectedIndex]);
      return;
    }

    setShowSuggestions(false);

    // If search query is empty, reset to initial state (homepage with all products)
    if (!searchQuery.trim()) {
      router.push("/");
      return;
    }

    // Navigate to homepage with search query parameter
    router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  // Handler for keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions) {
      if (e.key === "Enter") {
        handleSearch();
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        handleSearch();
        break;
      case "Escape":
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  return (
    <>
      <nav className="bg-yallashop-navy sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="text-3xl font-bold text-yallashop-yellow">
                YallaShop
              </div>
            </Link>

            {/* Search Bar - Centered */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="w-full relative" ref={searchRef}>
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full px-4 py-2 rounded-lg border-2 border-transparent focus:border-yallashop-yellow focus:outline-none"
                />
                <button
                  onClick={handleSearch}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-yallashop-yellow text-yallashop-navy px-4 py-1 rounded-md font-semibold hover:bg-yellow-500"
                >
                  Search
                </button>

                {/* Autocomplete Suggestions */}
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-80 overflow-y-auto">
                    {suggestions.map((product, index) => (
                      <button
                        key={product.id}
                        onClick={() => handleSuggestionClick(product)}
                        className={`w-full px-4 py-2.5 text-left hover:bg-gray-100 transition-colors ${
                          index === selectedIndex
                            ? "bg-yallashop-yellow bg-opacity-20"
                            : ""
                        }`}
                      >
                        <p className="text-sm font-medium text-gray-900">
                          {product.title}
                        </p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Side - Cart & User */}
            <div className="flex items-center space-x-6">
              <button className="hidden md:flex items-center space-x-2 text-white hover:text-yallashop-yellow cursor-pointer">
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span className="text-sm">Sign In</span>
              </button>

              {/* Cart Button */}
              <CartButton />
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-3">
            <div className="w-full relative">
              <input
                type="text"
                placeholder="What are you looking for?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full px-4 py-2 rounded-lg border-2 border-transparent focus:border-yallashop-yellow focus:outline-none text-sm"
              />
              <button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-yallashop-yellow text-yallashop-navy px-3 py-1 rounded-md font-semibold text-sm hover:bg-yallashop-yellow-light"
              >
                Search
              </button>

              {/* Autocomplete Suggestions - Mobile */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-80 overflow-y-auto">
                  {suggestions.map((product, index) => (
                    <button
                      key={product.id}
                      onClick={() => handleSuggestionClick(product)}
                      className={`w-full px-4 py-2.5 text-left hover:bg-gray-100 transition-colors ${
                        index === selectedIndex
                          ? "bg-yallashop-yellow bg-opacity-20"
                          : ""
                      }`}
                    >
                      <p className="text-sm font-medium text-gray-900">
                        {product.title}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mini Cart Sidebar */}
      <MiniCart />
    </>
  );
}
