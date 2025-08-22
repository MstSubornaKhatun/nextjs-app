'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import LoadingSpinner from './LoadingSpinner'

export default function AuthGuard({ children, requireAuth = true }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return // Still loading

    if (requireAuth && status === 'unauthenticated') {
      router.push('/login')
    }

    if (!requireAuth && status === 'authenticated') {
      router.push('/dashboard')
    }
  }, [status, requireAuth, router])

  // Show loading while checking authentication
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <LoadingSpinner size="xl" />
      </div>
    )
  }

  // If auth is required but user is not authenticated, show loading
  if (requireAuth && status === 'unauthenticated') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <LoadingSpinner size="xl" />
      </div>
    )
  }

  // If auth is not required but user is authenticated, show loading
  if (!requireAuth && status === 'authenticated') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <LoadingSpinner size="xl" />
      </div>
    )
  }

  return children
}