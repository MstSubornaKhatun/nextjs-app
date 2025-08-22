'use client'

import { Component } from 'react'
import { ExclamationTriangleIcon, ArrowPathIcon } from '@heroicons/react/24/outline'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="text-center p-8">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <ExclamationTriangleIcon className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Something went wrong
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
              {this.props.fallbackMessage || 'An unexpected error occurred. Please try again.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => this.setState({ hasError: false, error: null })}
                className="btn-primary flex items-center justify-center"
              >
                <ArrowPathIcon className="h-5 w-5 mr-2" />
                Try Again
              </button>
              <button
                onClick={() => window.location.reload()}
                className="btn-secondary"
              >
                Reload Page
              </button>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-left">
                <h3 className="font-mono text-sm font-semibold text-red-600 dark:text-red-400 mb-2">
                  Error Details (Development Only):
                </h3>
                <pre className="text-xs text-gray-800 dark:text-gray-200 overflow-auto">
                  {this.state.error.toString()}
                </pre>
              </div>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

// Functional Error Boundary Hook
export function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="text-center p-8">
        <ExclamationTriangleIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Oops! Something went wrong
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {error.message || 'An unexpected error occurred'}
        </p>
        <button onClick={resetErrorBoundary} className="btn-primary">
          Try Again
        </button>
      </div>
    </div>
  )
}