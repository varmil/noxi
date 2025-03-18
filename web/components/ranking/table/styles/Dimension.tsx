import type { JSX } from 'react'
import BigNumber from 'bignumber.js'
import { Progress } from '@/components/ui/progress'

/** text + progress bar */
export default function Dimension({
  dividend,
  divisor,
  className,
  icon,
  rtl
}: {
  dividend: number | BigNumber
  divisor: number | BigNumber
  className?: string
  icon?: JSX.Element
  rtl?: boolean
}) {
  const textClasses = 'sm:font-bold'

  if (dividend instanceof BigNumber) {
    dividend = dividend.toNumber()
  }
  if (divisor instanceof BigNumber) {
    divisor = divisor.toNumber()
  }

  return (
    <div className={`max-w-60 tabular-nums`}>
      <span
        className={`flex gap-1 items-center ${textClasses} ${
          rtl ? 'justify-end' : ''
        }`}
      >
        {dividend ? (
          <>
            <>{icon ?? null}</>
            <>{Math.round(dividend).toLocaleString()}</>
          </>
        ) : (
          '--'
        )}
      </span>
      <div>
        <Progress
          className={`h-0.5 sm:h-1 ${rtl ? 'rotate-180' : ''} ${
            className || ''
          }`}
          value={(dividend / divisor) * 100}
        />
      </div>
    </div>
  )
}
