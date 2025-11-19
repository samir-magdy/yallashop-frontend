export default function ProductLoading() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Skeleton */}
        <div className="mb-6 flex items-center space-x-2">
          <div className="h-4 w-12 bg-gray-300 rounded"></div>
          <div className="h-4 w-1 bg-gray-300 rounded"></div>
          <div className="h-4 w-24 bg-gray-300 rounded"></div>
          <div className="h-4 w-1 bg-gray-300 rounded"></div>
          <div className="h-4 w-48 bg-gray-300 rounded"></div>
        </div>

        {/* Product Detail Skeleton */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
            {/* Image Skeleton */}
            <div className="aspect-square bg-gray-300 rounded-lg"></div>

            {/* Info Skeleton */}
            <div className="flex flex-col space-y-4">
              {/* Brand & Category */}
              <div className="flex items-center gap-4">
                <div className="h-7 w-20 bg-gray-300 rounded-full"></div>
                <div className="h-4 w-32 bg-gray-300 rounded"></div>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <div className="h-8 w-full bg-gray-300 rounded"></div>
                <div className="h-8 w-3/4 bg-gray-300 rounded"></div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="h-5 w-32 bg-gray-300 rounded"></div>
                <div className="h-5 w-12 bg-gray-300 rounded"></div>
                <div className="h-5 w-24 bg-gray-300 rounded"></div>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="h-10 w-48 bg-gray-300 rounded"></div>
                <div className="h-4 w-32 bg-gray-300 rounded"></div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <div className="h-6 w-32 bg-gray-300 rounded"></div>
                <div className="h-4 w-full bg-gray-300 rounded"></div>
                <div className="h-4 w-full bg-gray-300 rounded"></div>
                <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
              </div>

              {/* Stock Status */}
              <div className="h-6 w-48 bg-gray-300 rounded"></div>

              {/* Button */}
              <div className="h-14 w-full bg-gray-300 rounded-lg"></div>

              {/* Features */}
              <div className="border-t pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-6 bg-gray-300 rounded"></div>
                  <div className="h-6 bg-gray-300 rounded"></div>
                  <div className="h-6 bg-gray-300 rounded"></div>
                  <div className="h-6 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Skeleton */}
        <div className="mt-12">
          <div className="h-8 w-64 bg-gray-300 rounded mb-6"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gray-300"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 w-full bg-gray-300 rounded"></div>
                  <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
                  <div className="h-6 w-24 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
