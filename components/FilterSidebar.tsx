"use client";

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
        <div className="bg-yallashop-navy text-white p-4 flex items-center justify-end">
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

        {/* Title */}
        <div className="px-6 py-4">
          <h2 className="text-3xl font-bold text-gray-900">Filters:</h2>
        </div>

        {/* Filter Controls - Centered Vertically */}
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="w-full space-y-6">
            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm font-medium focus:outline-none focus:border-yallashop-yellow cursor-pointer bg-white appearance-none"
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
            </div>

            {/* Price Range & Sort - Side by Side */}
            <div className="flex gap-3">
              <select
                value={priceRange}
                onChange={(e) => onPriceRangeChange(e.target.value)}
                className="w-1/2 px-4 py-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-yallashop-yellow cursor-pointer appearance-none"
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

              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="w-1/2 cursor-pointer px-4 py-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-yallashop-yellow appearance-none"
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
