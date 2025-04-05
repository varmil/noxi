'use client'

import { PropsWithoutRef, useEffect, useState } from 'react'
import dayjs, { humanizeDuration } from 'lib/dayjs'

export default function DurationBadge({
  duration
}: PropsWithoutRef<{
  /** ISO 8601 duration */
  duration: string
}>) {
  const [elapsedTime, setElapsedTime] = useState(duration)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setElapsedTime(dayjs.duration(elapsedTime).add(1, 's').toISOString())
    }, 1000)

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId)
  }, [elapsedTime])

  return (
    <div className="absolute bottom-1 right-1 bg-black/50 px-2 py-0.5 rounded text-white text-xs">
      <span>{humanizeDuration(elapsedTime)}</span>
    </div>
  )
}
