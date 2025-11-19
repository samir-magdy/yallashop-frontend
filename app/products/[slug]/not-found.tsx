import Link from 'next/link'

export default function ProductNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <svg
            className="w-32 h-32 mx-auto text-gray-400"
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
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">
          Sorry, we couldn&apos;t find the product you&apos;re looking for.
        </p>
        <Link
          href="/"
          className="inline-block bg-yallashop-yellow text-yallashop-navy px-8 py-3 rounded-lg font-semibold hover:bg-yallashop-yellow-light transition-colors"
        >
          Back to Homepage
        </Link>
      </div>
    </div>
  )
}
