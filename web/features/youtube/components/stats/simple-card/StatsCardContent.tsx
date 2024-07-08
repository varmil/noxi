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
      <div className="text-2xl font-bold">{children}</div>
      <p className="text-xs text-muted-foreground">{subText}</p>
    </CardContent>
  )
}
