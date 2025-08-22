
export default function LoadingSpinner({ size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  return (
    <div className={`inline-block ${sizeClasses[size]} ${className}`}>
      <div className="loading-spinner"></div>
    </div>
  )
}

// Full screen loading component
export function FullScreenLoader({ message = 'Loading...' }) {
  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90 flex items-center justify-center z-50">
      <div className="text-center">
        <LoadingSpinner size="xl" className="mb-4" />
        <p className="text-gray-600 dark:text-gray-300 text-lg">{message}</p>
      </div>
    </div>
  )
}

// Inline loading component
export function InlineLoader({ message = 'Loading...' }) {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="text-center">
        <LoadingSpinner size="lg" className="mb-4" />
        <p className="text-gray-600 dark:text-gray-300">{message}</p>
      </div>
    </div>
  )
}
