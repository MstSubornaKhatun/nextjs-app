'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { FullScreenLoader } from './LoadingSpinner'

export default function ProtectedRoute({ children }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  if (status === 'loading') {
    return <FullScreenLoader message="Checking authentication..." />
  }

  if (status === 'unauthenticated') {
    return null
  }

  return <>{children}</>
}