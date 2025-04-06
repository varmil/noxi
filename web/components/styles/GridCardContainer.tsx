import { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{
  className?: string
}>

const gridGapYClasses = 'gap-y-2'

const getGridClasses = (className?: string) => {
  return `grid gap-x-2 ${gridGapYClasses} \
         ${
           className ??
           'grid-cols-1 @xl:grid-cols-2 @4xl:grid-cols-3 @6xl:grid-cols-4'
         }`
}

/**
 * 親コンテナ
 */
export function GridCardGalleryContainer({ children }: PropsWithChildren) {
  return <div className={`@container grid ${gridGapYClasses}`}>{children}</div>
}

/**
 * @usage GridCardGalleryContainer > GridCardGalleryContent
 */
export function GridCardGalleryContent({ className, children }: Props) {
  return <section className={getGridClasses(className)}>{children}</section>
}
