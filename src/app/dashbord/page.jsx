'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  PlusIcon, 
  ShoppingBagIcon, 
  ChartBarIcon, 
  UsersIcon,
  CurrencyDollarIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline'
// import LoadingSpinner from '@/app/components/LoadingSpinner'
import toast from 'react-hot-toast'
import LoadingSpinner from '../components/LoadingSpinner'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalSales: 0,
    totalRevenue: 0,
    totalViews: 0
  })
  const [recentProducts, setRecentProducts] = useState([])
  const [loading, setLoading] = useState(true)

  // Redirect if not authenticated
  if (status === 'unauthenticated') {
    router.push('/login')
    return null
  }

  useEffect(() => {
    if (session) {
      fetchDashboardData()
    }
  }, [session])

  const fetchDashboardData = async () => {
    try {
      // Fetch user's products
      const response = await fetch('/api/dashboard/add-product')
      if (response.ok) {
        const products = await response.json()
        
        setStats({
          totalProducts: products.length,
          totalSales: Math.floor(Math.random() * 100) + 50, // Mock data
          totalRevenue: products.reduce((total, product) => total + product.price, 0),
          totalViews: Math.floor(Math.random() * 1000) + 500 // Mock data
        })

        // Get recent products (last 5)
        setRecentProducts(products.slice(0, 5))
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteProduct = async (productId) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      const response = await fetch(`/api/dashboard/add-product/${productId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        toast.success('Product deleted successfully!')
        fetchDashboardData() // Refresh data
      } else {
        toast.error('Failed to delete product')
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <LoadingSpinner size="xl" />
      </div>
    )
  }

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: ShoppingBagIcon,
      color: 'blue',
      change: '+12%',
      trend: 'up'
    },
    {
      title: 'Total Sales',
      value: stats.totalSales,
      icon: ChartBarIcon,
      color: 'green',
      change: '+8%',
      trend: 'up'
    },
    {
      title: 'Revenue',
      value: $`${stats.totalRevenue.toFixed(2)}`,
      icon: CurrencyDollarIcon,
      color: 'purple',
      change: '+15%',
      trend: 'up'
    },
    {
      title: 'Total Views',
      value: stats.totalViews,
      icon: EyeIcon,
      color: 'orange',
      change: '-3%',
      trend: 'down'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {session?.user?.name || 'User'}!
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Here's what's happening with your store today.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <Link
            href="/dashboard/add-product"
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-1">Add New Product</h3>
                <p className="text-blue-100 text-sm">Create a new product listing</p>
              </div>
              <PlusIcon className="h-8 w-8 group-hover:scale-110 transition-transform" />
            </div>
          </Link>

          <Link
            href="/dashboard/products"
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-1">My Products</h3>
                <p className="text-green-100 text-sm">Manage your products</p>
              </div>
              <ShoppingBagIcon className="h-8 w-8 group-hover:scale-110 transition-transform" />
            </div>
          </Link>

          <Link
            href="/products"
            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-1">Browse Products</h3>
                <p className="text-purple-100 text-sm">View all products</p>
              </div>
              <EyeIcon className="h-8 w-8 group-hover:scale-110 transition-transform" />
            </div>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <div
              key={stat.title}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-${stat.color}-100 dark:bg-${stat.color}-900`}>
                  <stat.icon className={`h-6 w-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                </div>
                <div className={`flex items-center text-sm ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? (
                    <ArrowUpIcon className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownIcon className="h-4 w-4 mr-1" />
                  )}
                  {stat.change}
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {stat.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Products */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Recent Products
            </h2>
            <Link
              href="/dashboard/products"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium text-sm"
            >
              View All →
            </Link>
          </div>

          {recentProducts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                      Product
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                      Category
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                      Price
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentProducts.map((product) => (
                    <tr key={product.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <img
                            src={product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100'}
                            alt={product.name}
                            className="w-12 h-12 rounded-lg object-cover mr-4"
                          />
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              {product.name}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {product.description?.substring(0, 50)}...
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs">
                          {product.category}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-semibold text-gray-900 dark:text-white">
                        ${product.price}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          product.inStock 
                            ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                            : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                        }`}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex space-x-2">
                          <Link
                            href={`/products/${product.id}`}
                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                            title="View"
                          >
                            <EyeIcon className="h-4 w-4" />
                          </Link>
                          <Link
                            href={`/dashboard/products/edit/${product.id}`}
                            className="text-green-600 hover:text-green-800 dark:text-green-400"
                            title="Edit"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => deleteProduct(product.id)}
                            className="text-red-600 hover:text-red-800 dark:text-red-400"
                            title="Delete"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <ShoppingBagIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No products yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Start by adding your first product to your store
              </p>
              <Link
                href="/dashboard/add-product"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Your First Product
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}