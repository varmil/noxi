import { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{
  className?: string
}>

const gridGapYClasses = 'gap-y-6 @xl:gap-y-8'

const getGridClasses = (className?: string) => {
  return `grid gap-x-2 @xl:gap-x-4 ${gridGapYClasses} \
         ${className ?? 'grid-cols-1 @xl:grid-cols-2 @4xl:grid-cols-4'}`
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
