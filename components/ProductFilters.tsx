"use client";

import { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProductCard from "./ProductCard";

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

  // Get search query from URL parameters
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const router = useRouter();

  // Handler to clear search and reset to all products
  const handleClearSearch = () => {
    router.push("/");
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
      switch (priceRange) {
        case "under-1000":
          filtered = filtered.filter((p) => p.price < 1000);
          break;
        case "1000-10000":
          filtered = filtered.filter((p) => p.price >= 1000 && p.price < 10000);
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

  return (
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
              {filteredAndSortedProducts.length === 1 ? "product" : "products"}
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
            Clear Search
          </button>
        </div>
      )}

      {/* Filters Bar */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === cat
                    ? "bg-yallashop-yellow text-yallashop-navy"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort & Price Filter */}
          <div className="flex flex-wrap gap-3">
            {/* Price Range */}
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-yallashop-yellow cursor-pointer"
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
              className="cursor-pointer px-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-yallashop-yellow"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Showing{" "}
            <span className="font-semibold text-yallashop-navy">
              {filteredAndSortedProducts.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-yallashop-navy">
              {products.length}
            </span>{" "}
            products
          </p>
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
    </div>
  );
}
