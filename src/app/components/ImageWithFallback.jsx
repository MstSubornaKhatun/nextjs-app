'use client'

import { useState } from 'react'
import { PhotoIcon } from '@heroicons/react/24/outline'

export default function ImageWithFallback({ 
  src, 
  alt, 
  className = '', 
  fallbackClassName = '',
  ...props 
}) {
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)

  const handleImageError = () => {
    setImageError(true)
    setImageLoading(false)
  }

  const handleImageLoad = () => {
    setImageLoading(false)
  }

  if (imageError || !src) {
    return (
      <div className={bg-gray-200 dark:bg-gray-700 flex items-center justify-center ${className} ${fallbackClassName}}>
        <PhotoIcon className="h-12 w-12 text-gray-400" />
      </div>
    )
  }

  return (
    <div className="relative">
      {imageLoading && (
        <div className={absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse ${className}} />
      )}
      <img
        src={src}
        alt={alt}
        className={${className} ${imageLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200}
        onError={handleImageError}
        onLoad={handleImageLoad}
        {...props}
      />
    </div>
  )
}