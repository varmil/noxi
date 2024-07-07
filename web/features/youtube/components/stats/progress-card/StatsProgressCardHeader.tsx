import { CardHeader, CardTitle } from '@/components/ui/card'
import React, { PropsWithoutRef } from 'react'

type Props = {
  description: React.ReactNode
  mainText: string
  subText: string
}

export default function StatsProgressCardHeader({
  description,
  mainText,
  subText
}: PropsWithoutRef<Props>) {
  return (
    <CardHeader className="pb-2">
      <div className="text-sm text-muted-foreground flex h-5">
        {description}
      </div>
      <CardTitle className="text-4xl">
        {mainText}
        <span className="pl-3 text-xs text-muted-foreground font-normal">
          {subText}
        </span>
      </CardTitle>
    </CardHeader>
  )
}
