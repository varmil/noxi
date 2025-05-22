import React, { PropsWithChildren } from 'react'

export function Sections({
  children,
  className
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={`grid grid-cols-1 gap-x-1 lg:gap-x-8 gap-y-12 ${
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
  const PaddingClass = title ? 'pb-6' : ''

  return (
    <section className={`${className ?? ''}`}>
      <div className={`flex items-center justify-between ${PaddingClass}`}>
        {title && (
          <h2 className="text-base font-bold tracking-tight">{title}</h2>
        )}
        {tabs && <div>{tabs}</div>}
      </div>
      <div className={`grid gap-2 ${gridClassName ?? ''}`}>{children}</div>
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
