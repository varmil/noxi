import { PropsWithChildren } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function StatsCard({
  children,
  className
}: PropsWithChildren<{ className?: string }>) {
  return <Card className={className}>{children}</Card>
}

export function StatsCardHeader({ children }: PropsWithChildren) {
  return (
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="flex text-sm font-medium h-5">{children}</CardTitle>
      {/* <Icon className="h-4 w-4 text-muted-foreground" /> */}
    </CardHeader>
  )
}

type Props = { subText?: string }
export function StatsCardContent({
  subText,
  children
}: PropsWithChildren<Props>) {
  return (
    <CardContent>
      <div className="text-2xl sm:text-3xl font-bold tabular-nums mb-0.5">
        {children}
      </div>
      <p className="text-xs text-muted-foreground">{subText}</p>
    </CardContent>
  )
}
