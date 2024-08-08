import { PropsWithChildren } from 'react'
import { CardContent } from '@/components/ui/card'

type Props = {}

export default function StatsProgressCardContent({
  children
}: PropsWithChildren<Props>) {
  return (
    <CardContent>
      <div className="text-xs text-muted-foreground">{children}</div>
    </CardContent>
  )
}
