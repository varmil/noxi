import type { JSX } from 'react'
import BigNumber from 'bignumber.js'
import { useTranslations } from 'next-intl'
import { Progress } from '@/components/ui/progress'

/** text + progress bar */
export default function Dimension({
  active,
  dividend,
  divisor,
  icon,
  rtl
}: {
  active?: boolean
  dividend: number | BigNumber
  divisor: number | BigNumber
  icon?: JSX.Element
  rtl?: boolean
}) {
  const t = useTranslations('Features.streamRanking')
  const textClasses = active ? 'font-bold' : 'text-muted-foreground'
  const barColor = active ? '' : '[&>*]:bg-muted-foreground'

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
      {active ? (
        <div>
          <Progress
            title={t('viewers')}
            className={`h-1 ${barColor} ${rtl ? 'rotate-180' : ''}`}
            value={(dividend / divisor) * 100}
          />
        </div>
      ) : null}
    </div>
  )
}
