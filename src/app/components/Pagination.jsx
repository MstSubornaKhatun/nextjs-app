'use client'

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

export default function Pagination({ 
  currentPage = 1, 
  totalPages = 1, 
  onPageChange,
  showInfo = true 
}) {
  const pages = []
  const maxVisiblePages = 5

  // Calculate which pages to show
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1)
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }

  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-between">
      {showInfo && (
        <div>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Page <span className="font-medium">{currentPage}</span> of{' '}
            <span className="font-medium">{totalPages}</span>
          </p>
        </div>
      )}

      <div className="flex items-center space-x-2">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-l-md hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeftIcon className="h-4 w-4" />
          <span className="sr-only">Previous</span>
        </button>

        {/* First page if not visible */}
        {startPage > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              1
            </button>
            {startPage > 2 && (
              <span className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500">
                ...
              </span>
            )}
          </>
        )}

        {/* Page numbers */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`relative inline-flex items-center px-4 py-2 text-sm font-medium border ${
              page === currentPage
                ? 'bg-primary border-primary text-white'
                : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            {page}
          </button>
        ))}

        {/* Last page if not visible */}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <span className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500">
                ...
              </span>
            )}
            <button
              onClick={() => onPageChange(totalPages)}
              className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-r-md hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRightIcon className="h-4 w-4" />
          <span className="sr-only">Next</span>
        </button>
      </div>
    </div>
  )
}

// Simple pagination component for fewer pages
export function SimplePagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  return (
    <div className="flex justify-center items-center space-x-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      
      <span className="text-gray-600 dark:text-gray-300">
        {currentPage} of {totalPages}
      </span>
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  )
}