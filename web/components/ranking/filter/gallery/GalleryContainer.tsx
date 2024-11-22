import { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{
  className?: string
}>

export default function GalleryContainer({ className, children }: Props) {
  return (
    <div className={`text-xs sm:text-sm bg-background ${className || ''}`}>
      {children}
    </div>
  )
}
