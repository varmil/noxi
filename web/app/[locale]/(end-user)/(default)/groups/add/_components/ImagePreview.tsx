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

/** 画像読み込み状態を管理する内部コンポーネント（key でリマウント） */
function ImageLoader({
  src,
  alt,
  size,
  onError
}: {
  src: string
  alt: string
  size: number
  onError: () => void
}) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="object-cover w-full h-full"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false)
          onError()
        }}
        style={{ display: isLoading ? 'none' : 'block' }}
      />
    </>
  )
}

export function ImagePreview({ src, alt, size = 80 }: ImagePreviewProps) {
  const imageSrc = getImageSrc(src)
  const [imageError, setImageError] = useState(false)
  const [errorSrc, setErrorSrc] = useState<string | null>(null)
  const t = useTranslations('Components.imagePreview')

  // エラー状態は該当 src の時のみ有効
  const hasError = imageError && errorSrc === imageSrc

  const handleError = () => {
    setImageError(true)
    setErrorSrc(imageSrc)
  }

  return (
    <div className="flex flex-col items-center space-y-2">
      <div
        className="relative overflow-hidden rounded-full border-2 border-gray-200 bg-gray-100 flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        {hasError || !imageSrc ? (
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
          <ImageLoader
            key={imageSrc}
            src={imageSrc}
            alt={alt}
            size={size}
            onError={handleError}
          />
        )}
      </div>

      <div className="text-xs text-gray-500 text-center max-w-[200px] break-all">
        {hasError || !imageSrc ? (
          <span className="text-red-500">{t('errorText')}</span>
        ) : (
          <span>{t('previewLabel')}</span>
        )}
      </div>
    </div>
  )
}
