'use client'

import { useState, useEffect } from 'react'
import { InlineLoader } from '../components/LoadingSpinner'
import { 
  FunnelIcon, 
  MagnifyingGlassIcon, 
  AdjustmentsHorizontalIcon,
  XMarkIcon,
  TagIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import ProductCard from '../components/ProductCard'

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 9 // Show 9 products (3x3 grid)

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    filterAndSortProducts()
    setCurrentPage(1) // Reset to first page when filters change
  }, [products, searchTerm, selectedCategory, priceRange, sortBy])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterAndSortProducts = () => {
    let filtered = products

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    }

    // Filter by price range
    if (priceRange !== 'all') {
      filtered = filtered.filter(product => {
        const price = product.price
        switch (priceRange) {
          case 'under-50':
            return price < 50
          case '50-100':
            return price >= 50 && price <= 100
          case '100-200':
            return price >= 100 && price <= 200
          case 'over-200':
            return price > 200
          default:
            return true
        }
      })
    }

    // Sort products
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'category':
          return a.category.localeCompare(b.category)
        case 'newest':
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
        default:
          return 0
      }
    })

    setFilteredProducts(sorted)
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('all')
    setPriceRange('all')
    setSortBy('name')
    setShowFilters(false)
  }

  const categories = ['all', ...new Set(products.map(product => product.category))]
  
  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const endIndex = startIndex + productsPerPage
  const currentProducts = filteredProducts.slice(startIndex, endIndex)

  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: 'under-50', label: 'Under $50' },
    { value: '50-100', label: '$50 - $100' },
    { value: '100-200', label: '$100 - $200' },
    { value: 'over-200', label: 'Over $200' }
  ]

  if (loading) {
    return <InlineLoader message="Loading products..." />
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6">
            <SparklesIcon className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Discover Our Products
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explore our carefully curated collection of premium products designed to exceed your expectations
          </p>
        </div>

        {/* Search and Filters Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  <XMarkIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>

            {/* Filter Button for Mobile */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl font-medium transition-colors flex items-center"
            >
              <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2" />
              Filters
            </button>

            {/* Desktop Filters */}
            <div className={`flex flex-col sm:flex-row gap-4 w-full lg:w-auto ${showFilters ? 'block' : 'hidden lg:flex'}`}>
              {/* Category Filter */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 dark:text-gray-300 font-medium min-w-[160px]"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
                <TagIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Price Range Filter */}
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 dark:text-gray-300 font-medium min-w-[140px]"
              >
                {priceRanges.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>

              {/* Sort Filter */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 dark:text-gray-300 font-medium min-w-[160px]"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="category">Sort by Category</option>
                <option value="newest">Newest First</option>
              </select>

              {/* Clear Filters Button */}
              {(searchTerm || selectedCategory !== 'all' || priceRange !== 'all' || sortBy !== 'name') && (
                <button
                  onClick={clearFilters}
                  className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Active Filters & Results Info */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {searchTerm && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                Search: "{searchTerm}"
                <button onClick={() => setSearchTerm('')} className="ml-2 hover:text-blue-600">
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </span>
            )}
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                Category: {selectedCategory}
                <button onClick={() => setSelectedCategory('all')} className="ml-2 hover:text-green-600">
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </span>
            )}
            {priceRange !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                Price: {priceRanges.find(r => r.value === priceRange)?.label}
                <button onClick={() => setPriceRange('all')} className="ml-2 hover:text-purple-600">
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </span>
            )}
          </div>
          <p className="text-gray-600 dark:text-gray-300 font-medium">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
          </p>
        </div>

        {/* Products Grid - 3 Column Layout */}
        {currentProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {currentProducts.map((product, index) => (
              <div 
                key={product.id}
                className="transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <MagnifyingGlassIcon className="h-16 w-16 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              No products found
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
              We couldn't find any products matching your criteria. Try adjusting your search or filters.
            </p>
            <button
              onClick={clearFilters}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-lg hover:shadow-xl"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-4 mt-12">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
            >
              Previous
            </button>
            
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                    currentPage === page
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
            >
              Next
            </button>
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {products.length}+
              </div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">
                Total Products
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {categories.length - 1}
              </div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">
                Categories
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                24/7
              </div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">
                Customer Support
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}