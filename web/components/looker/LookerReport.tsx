'use client'

import React from 'react'

type Props = {
  reportUrl: string
  title?: string
  height?: string
  className?: string
  scrolling?: boolean
}

export const LookerReport: React.FC<Props> = ({
  reportUrl,
  title = 'Looker Studio Report',
  height = '800px',
  className,
  scrolling
}) => {
  return (
    <div className="w-full h-full rounded-lg overflow-hidden">
      <iframe
        src={reportUrl}
        title={title}
        width="100%"
        className={className}
        // height={height}
        style={{ border: 'none', overflowY: 'hidden' }}
        // This is MUST for disable scroll
        scrolling={scrolling ? 'yes' : 'no'}
        sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
      />
    </div>
  )
}
