import { Suspense } from "react";
import ProductFilters from "@/components/ProductFilters";
import products from "@/data/products.json";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="hidden md:block bg-gradient-to-r from-yallashop-navy to-yallashop-navy-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome to{" "}
              <span className="text-yallashop-yellow">YallaShop</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300">
              Discover amazing products at unbeatable prices
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-yallashop-yellow"
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
                <span>Free Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-yallashop-yellow"
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
                <span>Easy Returns</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-yallashop-yellow"
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
                <span>Secure Payment</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Catalog with Filters */}
      <Suspense
        fallback={
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-600">
            Loading filters and product data...
          </div>
        }
      >
        <ProductFilters products={products} />
      </Suspense>
    </div>
  );
}
