import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import products from "@/data/products.json";
import AddToCartButton from "@/components/AddToCartButton";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

// Generate static params for all products
export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps) {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.title} | YallaShop`,
    description: product.description,
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  // Get related products from same category
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <ol className="flex items-center space-x-2 text-gray-600">
            <li>
              <Link href="/" className="hover:text-yallashop-yellow">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link
                href={`/?category=${encodeURIComponent(product.category)}`}
                className="hover:text-yallashop-yellow"
              >
                {product.category}
              </Link>
            </li>
            <li>/</li>
            <li className="text-yallashop-navy font-medium">{product.title}</li>
          </ol>
        </nav>

        {/* Product Detail */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
            {/* Product Image */}
            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {!product.inStock && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="bg-red-500 text-white px-6 py-3 rounded-lg font-bold text-lg">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              {/* Brand & Category */}
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-yallashop-navy text-white px-3 py-1 rounded-full text-sm font-medium">
                  {product.brand}
                </span>
                <span className="text-gray-600 text-sm">
                  {product.category} → {product.subcategory}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? "text-yallashop-yellow"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-lg font-semibold text-gray-900">
                  {product.rating}
                </span>
                <span className="text-gray-600">
                  ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-yallashop-navy">
                    EGP{" "}
                    {product.price.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">Inclusive of VAT</p>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-xl text-gray-900 font-semibold mb-3">
                  About this item
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                {product.inStock ? (
                  <div className="flex items-center gap-2 text-green-600">
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
                    <span className="font-medium">
                      In Stock - Ready to Ship
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-red-600">
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
                    <span className="font-medium">Currently Out of Stock</span>
                  </div>
                )}
              </div>

              {/* Add to Cart Button */}
              <div className="mb-6">
                <AddToCartButton product={product} variant="large" />
              </div>

              {/* Features */}
              <div className="border-t pt-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-700">
                    <svg
                      className="w-5 h-5 text-yallashop-yellow"
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
                  <div className="flex items-center gap-2 text-gray-700">
                    <svg
                      className="w-5 h-5 text-yallashop-yellow"
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
                  <div className="flex items-center gap-2 text-gray-700">
                    <svg
                      className="w-5 h-5 text-yallashop-yellow"
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
                  <div className="flex items-center gap-2 text-gray-700">
                    <svg
                      className="w-5 h-5 text-yallashop-yellow"
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
                    <span>Warranty Included</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/products/${relatedProduct.slug}`}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden group"
                >
                  <div className="relative h-48 bg-gray-100">
                    <Image
                      src={relatedProduct.image}
                      alt={relatedProduct.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2">
                      {relatedProduct.title}
                    </h3>
                    <p className="text-lg font-bold text-yallashop-navy">
                      EGP{" "}
                      {relatedProduct.price.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
