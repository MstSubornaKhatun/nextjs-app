export default function Skeleton({ className = '', width, height }) {
  const styles = {
    width: width || '100%',
    height: height || 'auto',
  }

  return (
    <div
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`}
      style={styles}
    />
  )
}

// Product Card Skeleton
export function ProductCardSkeleton() {
  return (
    <div className="card overflow-hidden h-full">
      {/* Image skeleton */}
      <Skeleton className="h-64 rounded-none" />
      
      {/* Content skeleton */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <Skeleton className="h-6 w-3/4" />
        
        {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        
        {/* Rating */}
        <Skeleton className="h-4 w-32" />
        
        {/* Price and status */}
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
        </div>
        
        {/* Button */}
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  )
}

// Product Grid Skeleton
export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }, (_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}

// Product Details Skeleton
export function ProductDetailSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
        {/* Image Section */}
        <div className="space-y-4">
          <Skeleton className="aspect-square rounded-xl" />
          <div className="flex space-x-2">
            {Array.from({ length: 3 }, (_, i) => (
              <Skeleton key={i} className="w-20 h-20 rounded-lg" />
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="space-y-6">
          {/* Category & Share */}
          <div className="flex justify-between items-center">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-8 w-8 rounded" />
          </div>
          
          {/* Title */}
          <Skeleton className="h-10 w-3/4" />
          
          {/* Description */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          
          {/* Rating */}
          <Skeleton className="h-6 w-48" />
          
          {/* Price */}
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-32" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
          
          {/* Stock */}
          <Skeleton className="h-6 w-24" />
          
          {/* Quantity */}
          <div className="flex items-center space-x-4">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-10 w-32" />
          </div>
          
          {/* Buttons */}
          <div className="flex gap-4">
            <Skeleton className="h-12 flex-1" />
            <Skeleton className="h-12 flex-1" />
            <Skeleton className="h-12 w-12" />
          </div>
          
          {/* Features */}
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 4 }, (_, i) => (
              <Skeleton key={i} className="h-6 w-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Text Skeleton
export function TextSkeleton({ lines = 1, className = '' }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton
          key={i}
          className={`h-4 ${i === lines - 1 && lines > 1 ? 'w-3/4' : 'w-full'}`}
        />
      ))}
    </div>
  )
}

// Avatar Skeleton
export function AvatarSkeleton({ size = 'md' }) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  }

  return (
    <Skeleton className={`${sizeClasses[size]} rounded-full`} />
  )
}