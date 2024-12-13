import { PropsWithChildren } from 'react'

export function Sections({
  children,
  className
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={`grid grid-cols-1 gap-x-1 lg:gap-x-2 gap-y-7 lg:gap-y-8 ${
        className ?? ''
      }`}
    >
      {children}
    </div>
  )
}

export function Section({
  gridClassName,
  className,
  title,
  children
}: PropsWithChildren<{
  gridClassName?: string
  className?: string
  title: string
}>) {
  return (
    <section className={`${className ?? ''}`}>
      <h2 className="text-base md:text-lg font-bold pb-6">{title}</h2>
      <div className={`grid gap-1 ${gridClassName ?? ''} lg:gap-2`}>
        {children}
      </div>
    </section>
  )
}

export function ChartGrid({ children }: PropsWithChildren) {
  return (
    <div className="grid gap-1 grid-cols-1 lg:gap-2 lg:grid-cols-2">
      {children}
    </div>
  )
}
