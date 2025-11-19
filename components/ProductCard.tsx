import Link from "next/link";
import Image from "next/image";
import AddToCartButton from "./AddToCartButton";

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

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      <Link href={`/products/${product.slug}`}>
        <div className="relative h-64 bg-gray-100 overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold">
                Out of Stock
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        {/* Brand & Category */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500 uppercase">
            {product.brand}
          </span>
          <span className="text-xs text-yallashop-navy font-medium">
            {product.subcategory}
          </span>
        </div>

        {/* Title */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-sm font-medium text-gray-800 hover:text-yallashop-yellow line-clamp-2 mb-2 h-10">
            {product.title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
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
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-2xl font-bold text-yallashop-navy">
              EGP {product.price.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Add to Cart Button */}
        <AddToCartButton product={product} />
      </div>
    </div>
  );
}
