import React, { PropsWithoutRef } from 'react'
import { Badge } from '@/components/ui/badge'
import { CardHeader, CardTitle } from '@/components/ui/card'

type Props = {
  titleIcon: React.ReactNode
  title: string
  description: string
  badgeText: string
}

export default function StreamListHeader({
  titleIcon,
  title,
  description,
  badgeText
}: PropsWithoutRef<Props>) {
  return (
    <CardHeader>
      <CardTitle className="flex items-center justify-between">
        <span className="flex items-center gap-2">
          {titleIcon}
          <span className="inline">{title}</span>
          <span className="sr-only">{description}</span>
        </span>
        <Badge variant="secondary" className="flex items-center gap-1">
          {badgeText}
        </Badge>
      </CardTitle>
    </CardHeader>
  )
}
