



import Link from 'next/link'
import { ArrowRightIcon, HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { useState } from 'react'

export default function ProductCard({ product }) {
  const [isFavorited, setIsFavorited] = useState(false)

  const toggleFavorite = (e) => {
    e.preventDefault()
    setIsFavorited(!isFavorited)
  }

  return (
    <div className="group relative">
      <div className="card overflow-hidden h-full">
        {/* Product Image */}
        <div className="relative h-64 bg-gray-200 dark:bg-gray-700 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition duration-300"></div>
          
          {/* Price Badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
              ${product.price}
            </span>
          </div>

          {/* Category Badge */}
          <div className="absolute top-4 right-4">
            <span className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
              {product.category}
            </span>
          </div>

          {/* Favorite Button */}
          <button
            onClick={toggleFavorite}
            className="absolute bottom-4 right-4 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
          >
            {isFavorited ? (
              <HeartIconSolid className="h-5 w-5 text-red-500" />
            ) : (
              <HeartIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            )}
          </button>

          {/* Quick Add to Cart */}
          <button className="absolute bottom-4 left-4 p-2 bg-primary text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary-600 hover:scale-110">
            <ShoppingCartIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Product Info */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition duration-200 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2 flex-grow">
            {product.description}
          </p>

          {/* Rating */}
          <div className="flex items-center mb-3">
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className="h-4 w-4 fill-current text-yellow-400"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">(4.9)</span>
          </div>

          {/* Stock Status and Price */}
          <div className="flex items-center justify-between mb-4">
            <span className={`text-xs px-2 py-1 rounded-full ${product.inStock 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            }`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
            <span className="text-lg font-bold text-primary">
              ${product.price}
            </span>
          </div>

          {/* Action Button */}
          <Link
            href={`/products/${product.id}`}
            className="w-full btn-primary flex items-center justify-center group/button mt-auto"
          >
            View Details
            <ArrowRightIcon className="ml-2 h-4 w-4 group-hover/button:translate-x-1 transition duration-200" />
          </Link>
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-lg ring-2 ring-transparent group-hover:ring-primary/20 transition duration-300 pointer-events-none"></div>
    </div>
  )
}