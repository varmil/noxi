'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'components/styles/Image'

interface ImagePreviewProps {
  src: string
  alt: string
  size?: number
}

// Handle relative vs absolute URL
const getImageSrc = (src: string): string | null => {
  if (!src || src.trim() === '') return null

  // If it's already an absolute URL (starts with http:// or https://)
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src
  }

  // If it's a relative path, resolve it relative to the application base URL
  if (src.startsWith('/')) {
    return src
  }

  // If it doesn't start with /, add it
  return `/${src}`
}

export function ImagePreview({ src, alt, size = 80 }: ImagePreviewProps) {
  const imageSrc = getImageSrc(src)

  const [imageError, setImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(!!imageSrc)
  const [prevImageSrc, setPrevImageSrc] = useState(imageSrc)
  const t = useTranslations('Components.imagePreview')

  // Reset loading state when src changes (React recommended pattern)
  if (imageSrc !== prevImageSrc) {
    setPrevImageSrc(imageSrc)
    setIsLoading(!!imageSrc)
    setImageError(false)
  }

  const handleImageLoad = () => {
    setIsLoading(false)
    setImageError(false)
  }

  const handleImageError = () => {
    setIsLoading(false)
    setImageError(true)
  }

  return (
    <div className="flex flex-col items-center space-y-2">
      <div
        className="relative overflow-hidden rounded-full border-2 border-gray-200 bg-gray-100 flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        {isLoading && !imageError && imageSrc && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          </div>
        )}

        {imageError || !imageSrc ? (
          <div className="flex flex-col items-center justify-center text-gray-400 text-xs text-center p-2">
            <svg
              className="w-6 h-6 mb-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>{t('fallbackText')}</span>
          </div>
        ) : (
          <Image
            src={imageSrc}
            alt={alt}
            width={size}
            height={size}
            className="object-cover w-full h-full"
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ display: isLoading ? 'none' : 'block' }}
          />
        )}
      </div>

      <div className="text-xs text-gray-500 text-center max-w-[200px] break-all">
        {imageError || !imageSrc ? (
          <span className="text-red-500">{t('errorText')}</span>
        ) : (
          <span>{t('previewLabel')}</span>
        )}
      </div>
    </div>
  )
}
