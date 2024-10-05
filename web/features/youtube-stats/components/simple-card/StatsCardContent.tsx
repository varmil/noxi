import { PropsWithChildren } from 'react'
import { CardContent } from '@/components/ui/card'

type Props = {
  subText?: string
}

export default function StatsCardContent({
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
