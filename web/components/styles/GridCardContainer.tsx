import { PropsWithChildren } from 'react'

const gridGapYClasses = 'gap-y-4'

const getGridClasses = () => {
  return `grid gap-x-4 ${gridGapYClasses} grid-cols-1 @xl:grid-cols-2 @4xl:grid-cols-3 @6xl:grid-cols-4`
}

/**
 * 親コンテナ
 */
export function GridCardGalleryContainer({ children }: PropsWithChildren) {
  return <div className={`@container grid ${gridGapYClasses}`}>{children}</div>
}

/**
 * @usage GridCardGalleryContainer > GridCardGalleryContent
 * force1Row: true でラップトップ以上の場合、２行に膨らまないようにする
 */
export function GridCardGalleryContent({
  force1Row,
  children
}: PropsWithChildren<{
  force1Row?: boolean
}>) {
  return (
    <section
      className={`${getGridClasses()} ${
        force1Row ? '@4xl:grid-rows-[1fr_0] @4xl:overflow-hidden' : ''
      }`}
    >
      {children}
    </section>
  )
}
