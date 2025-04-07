import { PropsWithChildren } from 'react'

export default function StreamGallery({
  className,
  children
}: PropsWithChildren<{ className?: string }>) {
  return (
    <section className={`py-6 flex flex-col gap-y-4 ${className ?? ''}`}>
      {children}
    </section>
  )
}
