"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useFilter } from "@/context/FilterContext";
import ProductCard from "./ProductCard";
import FilterSidebar from "./FilterSidebar";

interface Product {
  id: string;
  slug: string;
  title: string;
  price: number;
  category: string;
  subcategory: string;
  image: string;
  description: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  brand: string;
}

interface ProductFiltersProps {
  products: Product[];
}

export default function ProductFilters({ products }: ProductFiltersProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [priceRange, setPriceRange] = useState<string>("all");

  // Filter sidebar state (temporary values for mobile)
  const { isFilterOpen, setIsFilterOpen } = useFilter();
  const [tempCategory, setTempCategory] = useState<string>("All");
  const [tempSortBy, setTempSortBy] = useState<string>("featured");
  const [tempPriceRange, setTempPriceRange] = useState<string>("all");

  // Get search query and category from URL parameters
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const categoryParam = searchParams.get("category");
  const router = useRouter();

  // Handler to clear search and reset to all products
  const handleClearSearch = () => {
    router.push("/");
  };

  // Sync category from URL parameter
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(decodeURIComponent(categoryParam));
    } else {
      setSelectedCategory("All");
    }
  }, [categoryParam]);

  // Sync temp filters with actual filters when sidebar opens
  useEffect(() => {
    if (isFilterOpen) {
      setTempCategory(selectedCategory);
      setTempSortBy(sortBy);
      setTempPriceRange(priceRange);
    }
  }, [isFilterOpen, selectedCategory, sortBy, priceRange]);

  // Handler to apply filters from sidebar
  const handleApplyFilters = () => {
    setSelectedCategory(tempCategory);
    setSortBy(tempSortBy);
    setPriceRange(tempPriceRange);
    setIsFilterOpen(false);
  };

  // Handler to reset filters
  const handleResetFilters = () => {
    setTempCategory("All");
    setTempSortBy("featured");
    setTempPriceRange("all");
    setSelectedCategory("All");
    setSortBy("featured");
    setPriceRange("all");
  };

  // Get unique categories
  const categories = useMemo(() => {
    const cats = [
      "All",
      ...Array.from(new Set(products.map((p) => p.category))),
    ];
    return cats;
  }, [products]);

  // Get unique brands
  const brands = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.brand))).sort();
  }, [products]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.subcategory.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Filter by price range
    if (priceRange !== "all") {
      // Handle custom price range format: "custom-min-max"
      if (priceRange.startsWith("custom-")) {
        const parts = priceRange.split("-");
        const min = parseInt(parts[1]);
        const max = parseInt(parts[2]);
        filtered = filtered.filter((p) => p.price >= min && p.price <= max);
      } else {
        // Handle predefined ranges
        switch (priceRange) {
          case "under-1000":
            filtered = filtered.filter((p) => p.price < 1000);
            break;
          case "1000-10000":
            filtered = filtered.filter(
              (p) => p.price >= 1000 && p.price < 10000
            );
            break;
          case "10000-50000":
            filtered = filtered.filter(
              (p) => p.price >= 10000 && p.price < 50000
            );
            break;
          case "over-50000":
            filtered = filtered.filter((p) => p.price >= 50000);
            break;
        }
      }
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        // Featured - keep original order
        break;
    }

    return filtered;
  }, [products, selectedCategory, sortBy, priceRange, searchQuery]);

  // Check if any filters are active
  const hasActiveFilters =
    selectedCategory !== "All" || priceRange !== "all" || sortBy !== "featured";

  // Get readable filter labels
  const getFilterLabel = (type: string, value: string) => {
    if (type === "category") return value;
    if (type === "price") {
      // Handle custom price range format: "custom-min-max"
      if (value.startsWith("custom-")) {
        const parts = value.split("-");
        const min = parseInt(parts[1]);
        const max = parseInt(parts[2]);
        const formatPrice = (price: number) => {
          if (price >= 1000) return `${(price / 1000).toFixed(0)}K`;
          return price.toString();
        };
        return `EGP ${formatPrice(min)} - ${formatPrice(max)}`;
      }
      // Handle predefined ranges
      switch (value) {
        case "under-1000":
          return "Under 1K";
        case "1000-10000":
          return "1K - 10K";
        case "10000-50000":
          return "10K - 50K";
        case "over-50000":
          return "Over 50K";
        default:
          return "";
      }
    }
    if (type === "sort") {
      switch (value) {
        case "price-low":
          return "Price: Low-High";
        case "price-high":
          return "Price: High-Low";
        case "rating":
          return "Highest Rated";
        case "name":
          return "A-Z";
        default:
          return "";
      }
    }
    return "";
  };

  return (
    <>
      {/* Active Filters Bar - Mobile Only, Sticky */}
      {hasActiveFilters && (
        <div className="md:hidden sticky top-16 z-30 bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 overflow-x-auto">
            {selectedCategory !== "All" && (
              <button
                onClick={() => setSelectedCategory("All")}
                className="flex items-center gap-1 px-3 py-1.5 bg-yallashop-yellow text-yallashop-navy rounded-full text-sm font-medium whitespace-nowrap"
              >
                {getFilterLabel("category", selectedCategory)}
                <svg
                  className="w-4 h-4"
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
            )}
            {priceRange !== "all" && (
              <button
                onClick={() => setPriceRange("all")}
                className="flex items-center gap-1 px-3 py-1.5 bg-yallashop-yellow text-yallashop-navy rounded-full text-sm font-medium whitespace-nowrap"
              >
                {getFilterLabel("price", priceRange)}
                <svg
                  className="w-4 h-4"
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
            )}
            {sortBy !== "featured" && (
              <button
                onClick={() => setSortBy("featured")}
                className="flex items-center gap-1 px-3 py-1.5 bg-yallashop-yellow text-yallashop-navy rounded-full text-sm font-medium whitespace-nowrap"
              >
                {getFilterLabel("sort", sortBy)}
                <svg
                  className="w-4 h-4"
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
            )}
            <div className="flex-1"></div>
            <button
              onClick={handleResetFilters}
              className="px-4 py-1.5 bg-gray-200 text-gray-700 rounded-full text-sm font-semibold whitespace-nowrap hover:bg-gray-300"
            >
              Reset
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Results Header */}
        {searchQuery && (
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Search results for:{" "}
                <span className="text-yallashop-navy">
                  &quot;{searchQuery}&quot;
                </span>
              </h2>
              <p className="text-gray-600 mt-1">
                Found {filteredAndSortedProducts.length}{" "}
                {filteredAndSortedProducts.length === 1
                  ? "product"
                  : "products"}
              </p>
            </div>
            <button
              onClick={handleClearSearch}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Reset
            </button>
          </div>
        )}

        {/* Filters Bar - Desktop Only */}
        <div className="hidden md:block bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Category Filter */}
            <div className="w-full lg:w-auto">
              {/* Mobile: Dropdown */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="md:hidden w-full px-4 py-3 rounded-lg border border-gray-300 text-sm font-medium focus:outline-none focus:border-yallashop-yellow cursor-pointer bg-white appearance-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23374151'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 0.75rem center",
                  backgroundSize: "1.25rem",
                  paddingRight: "2.5rem",
                }}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "All" ? "Category" : cat}
                  </option>
                ))}
              </select>

              {/* Desktop: Buttons */}
              <div className="hidden md:flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === cat
                        ? "bg-yallashop-yellow text-yallashop-navy"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort & Price Filter */}
            <div className="flex gap-3 w-full lg:w-auto">
              {/* Price Range */}
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-1/2 md:w-auto px-4 py-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-yallashop-yellow cursor-pointer appearance-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23374151'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 0.75rem center",
                  backgroundSize: "1.25rem",
                  paddingRight: "2.5rem",
                }}
              >
                <option value="all">All Prices</option>
                <option value="under-1000">Under EGP 1,000</option>
                <option value="1000-10000">EGP 1,000 - 10,000</option>
                <option value="10000-50000">EGP 10,000 - 50,000</option>
                <option value="over-50000">Over EGP 50,000</option>
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-1/2 md:w-auto cursor-pointer px-4 py-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-yallashop-yellow appearance-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23374151'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 0.75rem center",
                  backgroundSize: "1.25rem",
                  paddingRight: "2.5rem",
                }}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredAndSortedProducts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <svg
              className="w-24 h-24 mx-auto text-gray-300 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No products found
            </h3>
            <p className="text-gray-500">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Filter Sidebar - Mobile Only */}
        <FilterSidebar
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          selectedCategory={tempCategory}
          sortBy={tempSortBy}
          priceRange={tempPriceRange}
          categories={categories}
          onCategoryChange={setTempCategory}
          onSortChange={setTempSortBy}
          onPriceRangeChange={setTempPriceRange}
          onApply={handleApplyFilters}
          onReset={handleResetFilters}
        />
      </div>
    </>
  );
}
