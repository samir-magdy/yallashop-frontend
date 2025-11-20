"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CartButton from "./CartButton";
import MiniCart from "./MiniCart";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // Handler for search submission
  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

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
    if (e.key === "Enter") {
      handleSearch();
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
              <div className="w-full relative">
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
            </div>
          </div>
        </div>
      </nav>

      {/* Mini Cart Sidebar */}
      <MiniCart />
    </>
  );
}
