// import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { mockProducts } from '../lib/db'
// import { ArrowRightIcon } from '@heroicons/react/24/outline'
// import { mockProducts } from '@/lib/db'

export default function ProductHighlights() {
  const featuredProducts = mockProducts.slice(0, 3)

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover our handpicked selection of premium products that our customers love most
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProducts.map((product, index) => (
            <div key={product.id} className="group relative">
              <div className="card overflow-hidden">
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
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition duration-200">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center mb-4">
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

                  {/* Stock Status */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${product.inStock 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>

                  {/* Action Button */}
                  <Link
                    href={`/products/${product.id}`}
                    className="w-full btn-primary flex items-center justify-center group"
                  >
                    View Details
                    <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition duration-200" />
                  </Link>
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-lg ring-2 ring-transparent group-hover:ring-primary/20 transition duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Link
            href="/products"
            className="inline-flex items-center px-8 py-3 text-lg font-semibold text-primary bg-transparent border-2 border-primary hover:bg-primary hover:text-white rounded-xl transition duration-200 shadow-lg hover:shadow-xl"
          >
            View All Products
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Link>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Best Prices</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Competitive pricing guaranteed</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Fast Delivery</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Quick and reliable shipping</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Quality Assured</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Premium quality products</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75c0-5.385-4.365-9.75-9.75-9.75z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">24/7 Support</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Round the clock assistance</p>
          </div>
        </div>
      </div>
    </section>
  )
}