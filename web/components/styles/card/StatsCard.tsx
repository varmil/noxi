import React, { PropsWithChildren } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Difference from 'components/styles/string/Difference'
import { Period } from 'types/period'

export function StatsCards({
  children,
  className
}: PropsWithChildren<{ className?: string }>) {
  return (
    <section
      className={`grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-4 ${
        className || ''
      }`}
    >
      {children}
    </section>
  )
}

export function StatsCard({
  children,
  className
}: PropsWithChildren<{ className?: string }>) {
  return <Card className={`gap-2 ${className}`}>{children}</Card>
}

export function StatsCardHeader({
  children,
  className
}: PropsWithChildren<{ className?: string }>) {
  return (
    <CardHeader className={`gap-0`}>
      <CardTitle
        className={`text-sm flex justify-between items-center w-full font-medium ${
          className ?? ''
        }`}
      >
        {children}
      </CardTitle>
    </CardHeader>
  )
}

type Props = {
  diff?: number
  diffIsPercent?: boolean
  period?: Period
  subText?: string | React.ReactNode
  className?: string
}
export function StatsCardContent({
  diff,
  diffIsPercent,
  period,
  subText,
  children,
  className
}: PropsWithChildren<Props>) {
  return (
    <CardContent className="flex flex-col gap-y-0">
      <div className="flex items-baseline gap-x-6">
        <div className={`text-2xl font-bold tabular-nums ${className ?? ''}`}>
          {children}
        </div>
      </div>
      <div className="flex justify-between items-baseline gap-x-6">
        {diff !== undefined ? (
          <Difference
            className="mt-2"
            diff={diff}
            isPercent={diffIsPercent}
            period={period}
          />
        ) : null}
        {subText && <p className="text-xs text-muted-foreground">{subText}</p>}
      </div>
    </CardContent>
  )
}
