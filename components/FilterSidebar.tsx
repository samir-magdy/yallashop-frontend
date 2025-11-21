"use client";

import { useState, useEffect } from "react";

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: string;
  sortBy: string;
  priceRange: string;
  categories: string[];
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: string) => void;
  onPriceRangeChange: (range: string) => void;
  onApply: () => void;
  onReset: () => void;
}

export default function FilterSidebar({
  isOpen,
  onClose,
  selectedCategory,
  sortBy,
  priceRange,
  categories,
  onCategoryChange,
  onSortChange,
  onPriceRangeChange,
  onApply,
  onReset,
}: FilterSidebarProps) {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50000);
  const MAX_PRICE = 50000;

  // Parse priceRange prop to set initial slider values
  useEffect(() => {
    if (priceRange === "all") {
      setMinPrice(0);
      setMaxPrice(MAX_PRICE);
    } else if (priceRange.startsWith("custom-")) {
      // Parse custom format: "custom-min-max"
      const parts = priceRange.split("-");
      const min = parseInt(parts[1]);
      const max = parseInt(parts[2]);
      setMinPrice(min);
      setMaxPrice(max);
    } else if (priceRange === "under-1000") {
      setMinPrice(0);
      setMaxPrice(1000);
    } else if (priceRange === "1000-10000") {
      setMinPrice(1000);
      setMaxPrice(10000);
    } else if (priceRange === "10000-50000") {
      setMinPrice(10000);
      setMaxPrice(50000);
    } else if (priceRange === "over-50000") {
      setMinPrice(50000);
      setMaxPrice(MAX_PRICE);
    }
  }, [priceRange]);

  const handlePriceChange = (min: number, max: number) => {
    setMinPrice(min);
    setMaxPrice(max);

    // Pass actual min/max values in a custom format
    if (min === 0 && max === MAX_PRICE) {
      onPriceRangeChange("all");
    } else {
      // Format: "custom-min-max" to pass actual values
      onPriceRangeChange(`custom-${min}-${max}`);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Filter Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col animate-slide-in">
        {/* Header */}
        <div className="bg-yallashop-navy text-white p-4 flex items-center justify-between">
          <div>
            <h2 className="text-white text-2xl font-bold text-gray-900">
              Filters:
            </h2>
          </div>
          <button onClick={onClose} className="hover:text-yallashop-yellow">
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

        {/* Filter Controls - Scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="space-y-8">
            {/* Category Filter - Pills */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                CATEGORY
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => onCategoryChange(cat)}
                    className={`px-2 py-1 rounded-full text-xs font-medium transition-all ${
                      selectedCategory === cat
                        ? "bg-yallashop-yellow text-yallashop-navy border-2 border-yallashop-yellow"
                        : "bg-white text-gray-700 border-2 border-gray-300 hover:border-yallashop-yellow hover:text-yallashop-navy"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range - Slider */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                PRICE RANGE
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    EGP {minPrice.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-600">
                    EGP {maxPrice.toLocaleString()}
                  </span>
                </div>
                <div className="relative pt-2 pb-6">
                  {/* Track Background */}
                  <div className="absolute w-full h-2 bg-gray-200 rounded-lg top-2"></div>
                  {/* Track Active Range */}
                  <div
                    className="absolute h-2 bg-yallashop-yellow rounded-lg top-2"
                    style={{
                      left: `${(minPrice / MAX_PRICE) * 100}%`,
                      right: `${100 - (maxPrice / MAX_PRICE) * 100}%`,
                    }}
                  ></div>
                  {/* Max Range Input */}
                  <input
                    type="range"
                    min="0"
                    max={MAX_PRICE}
                    step="100"
                    value={maxPrice}
                    onChange={(e) => {
                      const value = Math.max(
                        Number(e.target.value),
                        minPrice + 100
                      );
                      handlePriceChange(minPrice, value);
                    }}
                    className="range-slider-thumb absolute w-full h-2 bg-transparent appearance-none pointer-events-none z-30"
                    style={{
                      zIndex: 30,
                    }}
                  />
                  {/* Min Range Input */}
                  <input
                    type="range"
                    min="0"
                    max={MAX_PRICE}
                    step="100"
                    value={minPrice}
                    onChange={(e) => {
                      const value = Math.min(
                        Number(e.target.value),
                        maxPrice - 100
                      );
                      handlePriceChange(value, maxPrice);
                    }}
                    className="range-slider-thumb absolute w-full h-2 bg-transparent appearance-none pointer-events-none z-40"
                    style={{
                      zIndex: 40,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Sort Options - Radio Buttons */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                SORT BY
              </h3>
              <div className="space-y-2">
                {[
                  { value: "featured", label: "Featured" },
                  { value: "price-low", label: "Price: Low to High" },
                  { value: "price-high", label: "Price: High to Low" },
                  { value: "rating", label: "Highest Rated" },
                  { value: "name", label: "Name: A to Z" },
                ].map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <div className="relative">
                      <input
                        type="radio"
                        name="sort"
                        value={option.value}
                        checked={sortBy === option.value}
                        onChange={(e) => onSortChange(e.target.value)}
                        className="w-5 h-5 cursor-pointer accent-yallashop-yellow"
                      />
                    </div>
                    <span className="text-sm text-gray-700 group-hover:text-yallashop-navy">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Action Buttons */}
        <div className="border-t p-4 bg-gray-50">
          <div className="flex gap-3">
            <button
              onClick={onReset}
              className="flex-1 bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50"
            >
              Reset
            </button>
            <button
              onClick={onApply}
              className="flex-1 bg-yallashop-yellow text-yallashop-navy py-3 rounded-lg font-semibold hover:bg-yellow-500"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
