import { 
  MagnifyingGlassIcon, 
  ShoppingBagIcon, 
  ExclamationTriangleIcon,
  InboxIcon 
} from '@heroicons/react/24/outline'

export default function EmptyState({
  type = 'default',
  title,
  description,
  action,
  icon: CustomIcon,
  className = ''
}) {
  const getDefaultContent = () => {
    switch (type) {
      case 'no-results':
        return {
          icon: MagnifyingGlassIcon,
          title: 'No results found',
          description: 'Try adjusting your search or filter to find what you\'re looking for.',
        }
      case 'no-products':
        return {
          icon: ShoppingBagIcon,
          title: 'No products available',
          description: 'There are no products to display at the moment.',
        }
      case 'error':
        return {
          icon: ExclamationTriangleIcon,
          title: 'Something went wrong',
          description: 'An error occurred while loading the content. Please try again.',
        }
      case 'empty':
        return {
          icon: InboxIcon,
          title: 'Nothing here yet',
          description: 'Get started by adding your first item.',
        }
      default:
        return {
          icon: InboxIcon,
          title: 'No content available',
          description: 'There\'s nothing to show here right now.',
        }
    }
  }

  const defaultContent = getDefaultContent()
  const Icon = CustomIcon || defaultContent.icon
  const finalTitle = title || defaultContent.title
  const finalDescription = description || defaultContent.description

  return (
    <div className={`text-center py-12 px-4 ${className}`}>
      <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
        <Icon className="h-12 w-12 text-gray-400" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
        {finalTitle}
      </h3>
      
      <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
        {finalDescription}
      </p>
      
      {action && (
        <div className="flex justify-center">
          {action}
        </div>
      )}
    </div>
  )
}

// Specific Empty States
export function NoProductsFound({ onClearFilters }) {
  return (
    <EmptyState
      type="no-results"
      action={
        onClearFilters && (
          <button onClick={onClearFilters} className="btn-primary">
            Clear Filters
          </button>
        )
      }
    />
  )
}

export function NoProductsAvailable({ onAddProduct }) {
  return (
    <EmptyState
      type="no-products"
      title="No products yet"
      description="Start building your catalog by adding your first product."
      action={
        onAddProduct && (
          <button onClick={onAddProduct} className="btn-primary">
            Add First Product
          </button>
        )
      }
    />
  )
}

export function LoadingError({ onRetry }) {
  return (
    <EmptyState
      type="error"
      title="Failed to load products"
      description="We couldn't load the products. Please check your connection and try again."
      action={
        onRetry && (
          <button onClick={onRetry} className="btn-primary">
            Try Again
          </button>
        )
      }
    />
  )
}

// Compact Empty State for smaller areas
export function CompactEmptyState({ icon: Icon = InboxIcon, message = "No items found" }) {
  return (
    <div className="text-center py-8">
      <Icon className="h-8 w-8 text-gray-400 mx-auto mb-3" />
      <p className="text-sm text-gray-500 dark:text-gray-400">{message}</p>
    </div>
  )
}