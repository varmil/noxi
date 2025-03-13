import React, { PropsWithChildren } from 'react'

export function Sections({
  children,
  className
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={`grid grid-cols-1 gap-x-1 lg:gap-x-8 gap-y-8 ${
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
  tabs,
  children
}: PropsWithChildren<{
  gridClassName?: string
  className?: string
  title?: string
  tabs?: React.ReactNode
}>) {
  return (
    <section className={`${className ?? ''}`}>
      <div className="flex items-center justify-between pb-6">
        {title && (
          <h2 className="text-base sm:text-lg font-bold tracking-tight border-b-4 border-dotted border-border-variant">
            {title}
          </h2>
        )}
        {tabs && <div>{tabs}</div>}
      </div>
      <div className={`grid gap-1 ${gridClassName ?? ''} lg:gap-2`}>
        {children}
      </div>
    </section>
  )
}

export function ChartGrid({ children }: PropsWithChildren) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-6 gap-y-8">
      {children}
    </div>
  )
}
