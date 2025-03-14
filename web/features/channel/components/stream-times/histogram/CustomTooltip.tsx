import { useTranslations } from 'next-intl'

type TooltipProps = {
  text: string
  count: number
}
type Props = {
  payload?: { payload: TooltipProps }[]
}

export default function CustomTooltip({ payload }: Props) {
  const t = useTranslations('Features.youtube.stats.chart')
  const data = payload?.at(0)?.payload
  if (!data) return null

  return (
    <div className="rounded-lg border bg-popover text-popover-foreground p-2 shadow-xs text-xs sm:text-sm">
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-1">
          <span className="uppercase text-muted-foreground">
            {t('timeSlot')}
          </span>
          <span className="font-bold text-muted-foreground">{data.text}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="uppercase text-muted-foreground">
            {t('streamFrequency')}
          </span>
          <span className="font-bold">{data.count}</span>
        </div>
      </div>
    </div>
  )
}
