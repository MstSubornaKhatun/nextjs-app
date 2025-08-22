'use client'

import { useState } from 'react'
import { ChevronDownIcon, FunnelIcon } from '@heroicons/react/24/outline'

export default function CategoryFilter({ categories, onCategoryChange, onSortChange }) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [isOpen, setIsOpen] = useState(false)

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    onCategoryChange(category)
  }

  const handleSortChange = (sort) => {
    setSortBy(sort)
    onSortChange(sort)
  }

  const sortOptions = [
    { value: 'name', label: 'Name A-Z' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'category', label: 'Category' },
  ]

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Mobile Filter Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden btn-secondary flex items-center justify-center"
      >
        <FunnelIcon className="h-5 w-5 mr-2" />
        Filters
        <ChevronDownIcon className={h-4 w-4 ml-2 transform transition-transform ${isOpen ? 'rotate-180' : ''}} />
      </button>

      {/* Filters */}
      <div className={flex flex-col sm:flex-row gap-4 ${isOpen ? 'block' : 'hidden lg:flex'}}>
        {/* Category Filter */}
        <div className="min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="input-field"
          >
            <option value="all">All Categories</option>
            {categories.filter(cat => cat !== 'all').map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Filter */}
        <div className="min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="input-field"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Reset Filters */}
        <div className="flex items-end">
          <button
            onClick={() => {
              handleCategoryChange('all')
              handleSortChange('name')
            }}
            className="btn-secondary whitespace-nowrap"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  )
}