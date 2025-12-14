'use client'

import React, { useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { useIntersectionObserver } from '../../hooks/use-intersection-observer'

type Props = {
  reportUrl: string
  title?: string
  className?: string
  lazy?: boolean
}

export const LookerReport: React.FC<Props> = ({
  reportUrl,
  title = 'Looker Studio Report',
  className,
  lazy = true
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px', // 100px手前から読み込み開始
    triggerOnce: true
  })

  const shouldLoad = !lazy || isIntersecting

  const handleLoad = () => {
    setIsLoaded(true)
  }

  return (
    <div
      ref={elementRef}
      className={cn(
        'w-full h-full rounded-lg overflow-hidden relative',
        className
      )}
    >
      {!shouldLoad && (
        <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-lg">
          <Skeleton className="w-full h-full" />
        </div>
      )}

      {shouldLoad && (
        <>
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-lg z-10">
              <Skeleton className="w-full h-full" />
            </div>
          )}
          <iframe
            src={reportUrl}
            title={title}
            width="100%"
            height="100%"
            style={{ border: 'none', overflowY: 'hidden' }}
            scrolling="no"
            onLoad={handleLoad}
            sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
            className="w-full h-full"
          />
        </>
      )}
    </div>
  )
}
