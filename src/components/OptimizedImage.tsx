'use client'

import { useState } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  fallbackClassName?: string
  onError?: () => void
  loading?: 'lazy' | 'eager'
}

export default function OptimizedImage({
  src,
  alt,
  className = '',
  fallbackClassName = '',
  onError,
  loading = 'lazy'
}: OptimizedImageProps) {
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleError = () => {
    setHasError(true)
    setIsLoading(false)
    onError?.()
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  if (hasError) {
    return (
      <div className={`flex items-center justify-center bg-zinc-100 ${fallbackClassName || className}`}>
        <div className="text-center text-zinc-400">
          <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-xs">Не удалось<br />загрузить</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className={`absolute inset-0 flex items-center justify-center bg-zinc-100 ${className}`}>
          <div className="text-center text-zinc-400">
            <div className="w-8 h-8 mx-auto mb-2 border-2 border-zinc-300 border-t-zinc-600 rounded-full animate-spin" />
            <p className="text-xs">Загрузка...</p>
          </div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={className}
        onError={handleError}
        onLoad={handleLoad}
        loading={loading}
        style={{ display: hasError ? 'none' : 'block' }}
      />
    </div>
  )
}
