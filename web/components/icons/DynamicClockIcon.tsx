import React, { useMemo } from 'react'
import {
  Clock1,
  Clock2,
  Clock3,
  Clock4,
  Clock5,
  Clock6,
  Clock7,
  Clock8,
  Clock9,
  Clock10,
  Clock11,
  Clock12,
  LucideProps
} from 'lucide-react'

type ClockIconProps = LucideProps & {
  hour: number
}

const clockIcons = [
  Clock12,
  Clock1,
  Clock2,
  Clock3,
  Clock4,
  Clock5,
  Clock6,
  Clock7,
  Clock8,
  Clock9,
  Clock10,
  Clock11
]

const getClockIcon = (hour: number) => {
  const normalizedHour = ((hour % 12) + 12) % 12
  return clockIcons[normalizedHour]
}

export default function DynamicClockIcon({ hour, ...props }: ClockIconProps) {
  const currentHour = useMemo(() => {
    if (hour !== undefined) {
      return hour
    }
    return new Date().getHours()
  }, [hour])

  const ClockIcon = useMemo(() => getClockIcon(currentHour), [currentHour])

  return <ClockIcon {...props} />
}
