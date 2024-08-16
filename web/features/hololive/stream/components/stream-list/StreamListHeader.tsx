import { PropsWithoutRef } from 'react'
import { Badge } from '@/components/ui/badge'
import { CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'components/styles/Image'

type Props = { title: string; description: string }

export default function StreamListHeader({
  title,
  description
}: PropsWithoutRef<Props>) {
  return (
    <CardHeader className="p-4 pb-1 sm:p-6">
      <CardTitle className="flex items-center justify-between">
        <span className="flex items-center gap-2">
          <Image
            src={'/hololiveicon.png'}
            alt={`Hololive icon`}
            width={100}
            height={100}
            className="w-6 h-6"
          />
          <span className="inline">{title}</span>
          <span className="hidden">{description}</span>
        </span>
        <Badge variant="secondary" className="flex items-center gap-1">
          Scheduled
        </Badge>
      </CardTitle>
    </CardHeader>
  )
}
