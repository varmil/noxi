import React, { PropsWithChildren, SVGProps } from 'react'
import { LucideProps } from 'lucide-react'
import { CardHeader, CardTitle } from '@/components/ui/card'

type Props = {
  Icon:
    | React.ForwardRefExoticComponent<
        Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
      >
    | React.ComponentType<SVGProps<SVGSVGElement>>
}

export default function StatsCardHeader({
  Icon,
  children
}: PropsWithChildren<Props>) {
  return (
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="flex text-sm font-medium h-5">{children}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
  )
}
