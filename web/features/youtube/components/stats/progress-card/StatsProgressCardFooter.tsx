import { PropsWithoutRef } from 'react'
import { CardFooter } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

type Props = {
  value: number
  label?: string
}

export default function StatsProgressCardFooter({
  value,
  label
}: PropsWithoutRef<Props>) {
  return (
    <CardFooter>
      <Progress value={value} aria-label={label} />
    </CardFooter>
  )
}
