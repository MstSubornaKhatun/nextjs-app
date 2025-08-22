'use client'

import { useSession } from 'next-auth/react'
// import AuthGuard from '../components/AuthGuard'
// import UserMenu from '../components/UserMenu'
import Link from 'next/link'
import {
  ChartBarIcon,
  ShoppingBagIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  TruckIcon,
  HeartIcon,
  ClockIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import AuthGuard from '@/app/components/AuthGuard'

function DashboardContent() {
  const { data: session, status } = useSession()

  const stats = [
    {
      name: 'Total Orders',
      value: '12',
      icon: ShoppingBagIcon,
      color: 'bg-blue-500',
      change: '+20.1%',
      changeType: 'increase'
    },
    {
      name: 'Total Spent',
      value: '$2,847',
      icon: CurrencyDollarIcon,
      color: 'bg-green-500',
      change: '+15.3%',
      changeType: 'increase'
    },
    {
      name: 'Wishlist Items',
      value: '8',
      icon: HeartIcon,
      color: 'bg-purple-500',
      change: '+5.4%',
      changeType: 'increase'
    },
    {
      name: 'Pending Orders',
      value: '2',
      icon: ClockIcon,
      color: 'bg-orange-500',
      change: '-2.1%',
      changeType: 'decrease'
    }
  ]

  const recentOrders = [
    {
      id: 'ORD-001',
      product: 'Ergonomic Office Chair',
      amount: '$199.99',
      status: 'Delivered',
      date: '2024-01-15',
      statusColor: 'bg-green-100 text-green-800'
    },
    {
      id: 'ORD-002',
      product: 'Professional Camera Lens',
      amount: '$599.99',
      status: 'Shipped',
      date: '2024-01-14',
      statusColor: 'bg-blue-100 text-blue-800'
    },
    {
      id: 'ORD-003',
      product: 'Organic Cotton T-Shirt',
      amount: '$29.99',
      status: 'Processing',
      date: '2024-01-13',
      statusColor: 'bg-yellow-100 text-yellow-800'
    }
  ]

  const quickActions = [
    {
      name: 'Browse Products',
      description: 'Explore our product catalog',
      href: '/products',
      icon: ShoppingBagIcon,
      color: 'bg-blue-500'
    },
    {
      name: 'View Orders',
      description: 'Check your order history',
      href: '/orders',
      icon: TruckIcon,
      color: 'bg-green-500'
    },
    {
      name: 'Wishlist',
      description: 'View saved items',
      href: '/wishlist',
      icon: HeartIcon,
      color: 'bg-purple-500'
    },
    {
      name: 'Profile Settings',
      description: 'Update your profile',
      href: '/profile',
      icon: UserGroupIcon,
      color: 'bg-orange-500'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-lg">E</span>
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">EcomStore</span>
              </Link>
            </div>
            {/* <UserMenu /> */}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {session?.user?.name?.split(' ')[0] || 'User'}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Here's what's happening with your account today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.name}</p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
              </div>
              <div className="mt-4">
                <span className={`text-sm font-medium ${
                  stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">from last month</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Orders</h2>
                  <Link 
                    href="/orders" 
                    className="text-sm text-blue-600 hover:text-blue-500 font-medium"
                  >
                    View all
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white">{order.product}</h3>
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">{order.amount}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500 dark:text-gray-400">#{order.id} • {order.date}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${order.statusColor}`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Actions</h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {quickActions.map((action) => (
                    <Link
                      key={action.name}
                      href={action.href}
                      className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className={`${action.color} p-2 rounded-lg mr-3`}>
                        <action.icon className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{action.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{action.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Account Info */}
            <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Account Info</h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Email:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{session?.user?.email}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Member since:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">January 2024</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Status:</span>
                    <span className="flex items-center text-sm font-medium text-green-600">
                      <CheckCircleIcon className="h-4 w-4 mr-1" />
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <AuthGuard requireAuth={true}>
      <DashboardContent />
    </AuthGuard>
  )
}


