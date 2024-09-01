import { PropsWithChildren } from 'react'

/**
 * Stream, VideoCardなどをレスポンシブグリッド表示するための親コンテナ
 */
export default function GridCardContainer({ children }: PropsWithChildren) {
  return (
    <div
      className={`grid gap-x-2 gap-y-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-3`}
    >
      {children}
    </div>
  )
}
