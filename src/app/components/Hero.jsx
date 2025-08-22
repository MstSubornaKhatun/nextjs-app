import Link from 'next/link'
import { ArrowRightIcon, ShoppingBagIcon, StarIcon } from '@heroicons/react/24/outline'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-secondary/20 to-accent/10 dark:from-primary/20 dark:via-secondary/30 dark:to-accent/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                Discover Amazing
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  Products
                </span>
              </h1>
              <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                Find the perfect products for your lifestyle. From cutting-edge electronics to 
                sustainable fashion, we have everything you need at unbeatable prices.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <ShoppingBagIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Free Shipping</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">On orders over $50</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <StarIcon className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Top Quality</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Premium products</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-secondary/30 rounded-lg">
                  <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Best Prices</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Competitive rates</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/products"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-primary to-accent hover:from-primary-600 hover:to-accent-600 rounded-xl transition duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Shop Now
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                href="/products"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-primary bg-white dark:bg-gray-800 dark:text-white border-2 border-primary hover:bg-primary hover:text-white dark:hover:bg-primary rounded-xl transition duration-200 shadow-lg hover:shadow-xl"
              >
                Browse Collection
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-8 pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">1000+</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Products</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-accent">50K+</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Happy Customers</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">99%</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Satisfaction</p>
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=600&fit=crop&crop=center"
                alt="Shopping Experience"
                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
              />
              
              {/* Floating Cards */}
              <div className="absolute -top-4 -left-4 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                    <StarIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">4.9★</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Customer Rating</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-accent to-primary rounded-lg flex items-center justify-center">
                    <ShoppingBagIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">24/7</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Support</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-10 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl"></div>
              <div className="absolute bottom-10 right-10 w-32 h-32 bg-accent/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239b27ce' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
    </section>
  )
}