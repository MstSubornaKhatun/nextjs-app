'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { 
  StarIcon, 
  HeartIcon, 
  ShoppingCartIcon, 
  ArrowLeftIcon, 
  ShareIcon,
  TruckIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
  ChatBubbleBottomCenterTextIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import toast from 'react-hot-toast'
import { InlineLoader } from '@/app/components/LoadingSpinner'
import ProductCard from '@/app/components/ProductCard'

export default function ProductDetailPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [isFavorited, setIsFavorited] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [activeTab, setActiveTab] = useState('description')

  useEffect(() => {
    if (id) {
      fetchProduct()
    }
  }, [id])

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${id}`)
      if (response.ok) {
        const data = await response.json()
        setProduct(data.product)
        setRelatedProducts(data.relatedProducts || [])
      } else {
        throw new Error('Product not found')
      }
    } catch (error) {
      console.error('Error fetching product:', error)
      toast.error('Product not found')
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    toast.success(`Added ${quantity} ${product.name}(s) to cart!`)
  }

  const handleBuyNow = () => {
    toast.success('Redirecting to checkout...')
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success('Product link copied to clipboard!')
    }
  }

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited)
    toast.success(isFavorited ? 'Removed from favorites' : 'Added to favorites')
  }

  if (loading) {
    return <InlineLoader message="Loading product details..." />
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Product Not Found
          </h1>
          <Link href="/products" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  // Generate multiple images for demonstration
  const productImages = [
    product.image,
    product.image,
    product.image,
    product.image
  ]

  const features = [
    { icon: TruckIcon, text: 'Free Shipping', description: 'On orders over $50' },
    { icon: ShieldCheckIcon, text: 'Quality Guarantee', description: '30-day warranty' },
    { icon: ArrowPathIcon, text: 'Easy Returns', description: 'Hassle-free returns' },
    { icon: ChatBubbleBottomCenterTextIcon, text: '24/7 Support', description: 'Always here to help' }
  ]

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'specifications', label: 'Specifications' },
    { id: 'reviews', label: 'Reviews (127)' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/products"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200 font-medium"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Products
          </Link>
        </div>

        {/* Product Details */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-6 lg:p-10">
            {/* Product Images */}
            <div className="space-y-6">
              {/* Main Image */}
              <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-2xl overflow-hidden shadow-inner">
                <img
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              {/* Thumbnail Images */}
              <div className="flex space-x-3 justify-center lg:justify-start">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-3 transition-all duration-200 hover:scale-105 ${
                      selectedImage === index
                        ? 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              {/* Header */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-block px-4 py-2 text-sm font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
                    {product.category}
                  </span>
                  <button
                    onClick={handleShare}
                    className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                    title="Share product"
                  >
                    <ShareIcon className="h-6 w-6" />
                  </button>
                </div>
                
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                  {product.name}
                </h1>
                
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-4">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                      key={star}
                      className="h-6 w-6 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-gray-600 dark:text-gray-300 font-medium">4.9 (127 reviews)</span>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-baseline space-x-4">
                  <span className="text-4xl lg:text-5xl font-bold text-blue-600 dark:text-blue-400">
                    ${product.price}
                  </span>
                  <span className="text-xl text-gray-500 line-through">
                    ${(product.price * 1.2).toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 px-3 py-1 rounded-full text-sm font-semibold">
                    17% OFF
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Limited time offer
                  </span>
                </div>
              </div>

              {/* Stock Status */}
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className={`font-semibold text-lg ${product.inStock ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
                {product.inStock && (
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    (Only 12 left!)
                  </span>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center space-x-6">
                <label htmlFor="quantity" className="text-gray-700 dark:text-gray-300 font-semibold text-lg">
                  Quantity:
                </label>
                <div className="flex items-center border-2 border-gray-200 dark:border-gray-600 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 font-semibold text-lg"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 font-bold text-lg border-x-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 font-semibold text-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="sm:col-span-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  <ShoppingCartIcon className="h-6 w-6 mr-3" />
                  Add to Cart
                </button>
                
                <button
                  onClick={toggleFavorite}
                  className="p-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {isFavorited ? (
                    <HeartIconSolid className="h-6 w-6 text-red-500 mx-auto" />
                  ) : (
                    <HeartIcon className="h-6 w-6 text-gray-400 mx-auto" />
                  )}
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-lg"
              >
                Buy Now
              </button>

              {/* Product Features */}
              <div className="grid grid-cols-2 gap-4 pt-8 border-t-2 border-gray-200 dark:border-gray-700">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      <feature.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <span className="block font-semibold text-gray-900 dark:text-white text-sm">
                        {feature.text}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {feature.description}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden mb-12">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex space-x-8 px-6 lg:px-10">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-semibold text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6 lg:p-10">
            {activeTab === 'description' && (
              <div className="prose dark:prose-invert max-w-none">
                <h3 className="text-xl font-bold mb-4">Product Description</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {product.description}
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
                  This premium product offers exceptional quality and value. Crafted with attention to detail, 
                  it's designed to meet your highest expectations and provide long-lasting satisfaction.
                </p>
              </div>
            )}
            
            {activeTab === 'specifications' && (
              <div>
                <h3 className="text-xl font-bold mb-6">Product Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="font-medium">Category</span>
                      <span className="text-gray-600 dark:text-gray-300">{product.category}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="font-medium">Brand</span>
                      <span className="text-gray-600 dark:text-gray-300">EcomStore</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="font-medium">Availability</span>
                      <span className={product.inStock ? 'text-green-600' : 'text-red-600'}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="font-medium">SKU</span>
                      <span className="text-gray-600 dark:text-gray-300">EC-{product.id}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="font-medium">Weight</span>
                      <span className="text-gray-600 dark:text-gray-300">1.2 kg</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="font-medium">Warranty</span>
                      <span className="text-gray-600 dark:text-gray-300">1 Year</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-xl font-bold mb-6">Customer Reviews</h3>
                <div className="space-y-6">
                  {[1, 2, 3].map((review) => (
                    <div key={review} className="border-b border-gray-200 dark:border-gray-700 pb-6">
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                          U{review}
                        </div>
                        <div>
                          <div className="font-semibold">User {review}</div>
                          <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <StarIcon key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">
                        Excellent product! Great quality and fast shipping. Highly recommended.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Related Products
              </h2>
              <Link 
                href="/products" 
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors"
              >
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.slice(0, 3).map((relatedProduct) => (
                <div key={relatedProduct.id} className="transform hover:scale-105 transition-transform duration-300">
                  <ProductCard product={relatedProduct} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}