'use client'

import { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'

export default function CommentContent({ children }: PropsWithChildren) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showReadMore, setShowReadMore] = useState(false)
  const contentRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      const lineHeight = parseInt(
        window.getComputedStyle(contentRef.current).lineHeight
      )
      const height = contentRef.current.clientHeight
      setShowReadMore(height > lineHeight * 4)
    }
  }, [children])

  return (
    <>
      <p
        ref={contentRef}
        className={`text-base whitespace-pre-wrap break-anywhere ${
          !isExpanded && showReadMore ? 'line-clamp-4' : ''
        }`}
      >
        {children}
      </p>
      {showReadMore && !isExpanded && (
        <Button
          variant="ghost"
          className="text-sm p-0 font-normal text-muted-foreground"
          onClick={() => setIsExpanded(true)}
        >
          続きを読む
        </Button>
      )}
    </>
  )
}
