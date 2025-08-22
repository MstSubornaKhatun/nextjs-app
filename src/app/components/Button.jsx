import LoadingSpinner from './LoadingSpinner'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  icon = null,
  iconPosition = 'left',
  className = '',
  ...props
}) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary hover:bg-primary-600 text-white border-transparent'
      case 'secondary':
        return 'bg-secondary hover:bg-secondary-200 text-primary border-transparent'
      case 'accent':
        return 'bg-accent hover:bg-accent-600 text-white border-transparent'
      case 'outline':
        return 'bg-transparent hover:bg-primary hover:text-white text-primary border-primary'
      case 'ghost':
        return 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 border-transparent'
      case 'danger':
        return 'bg-red-600 hover:bg-red-700 text-white border-transparent'
      case 'success':
        return 'bg-green-600 hover:bg-green-700 text-white border-transparent'
      case 'warning':
        return 'bg-yellow-600 hover:bg-yellow-700 text-white border-transparent'
      default:
        return 'bg-primary hover:bg-primary-600 text-white border-transparent'
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case 'xs':
        return 'px-2 py-1 text-xs'
      case 'sm':
        return 'px-3 py-2 text-sm'
      case 'md':
        return 'px-4 py-2 text-base'
      case 'lg':
        return 'px-6 py-3 text-lg'
      case 'xl':
        return 'px-8 py-4 text-xl'
      default:
        return 'px-4 py-2 text-base'
    }
  }

  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg border transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const widthStyles = fullWidth ? 'w-full' : ''
  
  const isDisabled = disabled || loading

  return (
    <button
      className={`${baseStyles} ${getVariantStyles()} ${getSizeStyles()} ${widthStyles} ${className}`}
      disabled={isDisabled}
      {...props}
    >
      {loading && (
        <LoadingSpinner size="sm" className="mr-2" />
      )}
      
      {!loading && icon && iconPosition === 'left' && (
        <span className="mr-2">{icon}</span>
      )}
      
      {children}
      
      {!loading && icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
    </button>
  )
}

// Icon Button
export function IconButton({
  icon,
  variant = 'ghost',
  size = 'md',
  className = '',
  ...props
}) {
  const getSizeStyles = () => {
    switch (size) {
      case 'xs':
        return 'p-1'
      case 'sm':
        return 'p-2'
      case 'md':
        return 'p-2'
      case 'lg':
        return 'p-3'
      default:
        return 'p-2'
    }
  }

  return (
    <Button
      variant={variant}
      className={`${getSizeStyles()} ${className}`}
      {...props}
    >
      {icon}
    </Button>
  )
}

// Button Group
export function ButtonGroup({ children, className = '' }) {
  return (
    <div className={`inline-flex rounded-lg shadow-sm ${className}`} role="group">
      {children}
    </div>
  )
}