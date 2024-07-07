import { CardContent } from '@/components/ui/card'
import { PropsWithChildren } from 'react'

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
