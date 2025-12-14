'use client'

import React, { useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { useIntersectionObserver } from '../../hooks/use-intersection-observer'

const LookerReportSkeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={`flex flex-col gap-3 p-4 bg-background rounded-lg border ${className}`}
    >
      {/* ヘッダー部分のスケルトン */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-16" />
      </div>
      {/* コンテンツ部分のスケルトン */}
      <div className="flex-1 flex flex-col gap-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="flex-1 w-full" />
      </div>
    </div>
  )
}

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
    threshold: 0.5,
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
      {!shouldLoad && <LookerReportSkeleton className="w-full h-full" />}

      {shouldLoad && (
        <>
          {!isLoaded && <LookerReportSkeleton className="absolute inset-0" />}
          <iframe
            src={reportUrl}
            title={title}
            width="100%"
            height="100%"
            // DO NOT DELETE THIS: This is MUST for disable scroll
            scrolling="no"
            style={{ border: 'none', overflowY: 'hidden' }}
            onLoad={handleLoad}
            sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
            // className={className}
          />
        </>
      )}
    </div>
  )
}
