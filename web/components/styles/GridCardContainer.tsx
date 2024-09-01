import { PropsWithChildren } from 'react'

type Props = {
  className?: string
}

/**
 * Stream, VideoCardなどをレスポンシブグリッド表示するための親コンテナ
 */
export default function GridCardContainer({
  className,
  children
}: PropsWithChildren<Props>) {
  return (
    <div
      className={`grid gap-x-2 gap-y-6 sm:gap-x-4 sm:gap-y-8 \
        grid-cols-1 sm:grid-cols-3 md:grid-cols-3 ${className ?? ''}`}
    >
      {children}
    </div>
  )
}
