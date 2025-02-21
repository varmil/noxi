import { PropsWithChildren } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Difference from 'components/styles/string/Difference'

export function StatsCards({ children }: PropsWithChildren<{}>) {
  return (
    <section className={'grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-4'}>
      {children}
    </section>
  )
}

export function StatsCard({
  children,
  className
}: PropsWithChildren<{ className?: string }>) {
  return <Card className={className}>{children}</Card>
}

export function StatsCardHeader({ children }: PropsWithChildren) {
  return (
    <CardHeader className="flex flex-row items-center space-y-0 pb-2">
      <CardTitle className="flex justify-between w-full text-sm font-medium h-5">
        {children}
      </CardTitle>
      {/* <Icon className="h-4 w-4 text-muted-foreground" /> */}
    </CardHeader>
  )
}

type Props = {
  diff?: number
  diffIsPercent?: boolean
  subText?: string
  className?: string
}
export function StatsCardContent({
  diff,
  diffIsPercent,
  subText,
  children,
  className
}: PropsWithChildren<Props>) {
  return (
    <CardContent>
      <div className="flex items-baseline gap-x-5">
        <div
          className={`text-xl sm:text-2xl font-bold tabular-nums ${
            className ?? ''
          }`}
        >
          {children}
        </div>
        {diff !== undefined ? (
          <Difference diff={diff} isPercent={diffIsPercent} />
        ) : null}
      </div>
      {subText && (
        <p className="mt-1.5 text-xs text-muted-foreground">{subText}</p>
      )}
    </CardContent>
  )
}
