export default function Badge({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '' 
}) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary text-white'
      case 'secondary':
        return 'bg-secondary text-primary'
      case 'accent':
        return 'bg-accent text-white'
      case 'success':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'danger':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'info':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'gray':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
      default:
        return 'bg-primary text-white'
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-2 py-1 text-xs'
      case 'md':
        return 'px-3 py-1 text-sm'
      case 'lg':
        return 'px-4 py-2 text-base'
      default:
        return 'px-3 py-1 text-sm'
    }
  }

  return (
    <span className={`inline-flex items-center font-medium rounded-full ${getVariantStyles()} ${getSizeStyles()} ${className}`}>
      {children}
    </span>
  )
}

// Status Badge for products
export function StatusBadge({ inStock }) {
  return (
    <Badge variant={inStock ? 'success' : 'danger'} size="sm">
      {inStock ? 'In Stock' : 'Out of Stock'}
    </Badge>
  )
}

// Category Badge
export function CategoryBadge({ category }) {
  return (
    <Badge variant="gray" size="sm">
      {category}
    </Badge>
  )
}

// Price Badge
export function PriceBadge({ price, originalPrice, discount }) {
  return (
    <div className="flex items-center space-x-2">
      <Badge variant="primary" size="md">
        ${price}
      </Badge>
      {originalPrice && originalPrice > price && (
        <>
          <span className="text-sm text-gray-500 line-through">
            ${originalPrice}
          </span>
          {discount && (
            <Badge variant="danger" size="sm">
              {discount}% OFF
            </Badge>
          )}
        </>
      )}
    </div>
  )
}