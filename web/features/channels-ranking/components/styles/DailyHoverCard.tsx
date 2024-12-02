import { useFormatter, useTranslations } from 'next-intl'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import dayjs from 'lib/dayjs'

const getActualEndTimeGTE = (date: dayjs.ConfigType) =>
  dayjs(date).subtract(1, 'day').toDate()

const getActualEndTimeLTE = (date: dayjs.ConfigType) => dayjs(date).toDate()

type Props = {
  date?: string | Date
}

export default function DailyHoverCard({ date }: Props) {
  const t = useTranslations('Features.channelsRanking.hoverCard')
  const formatter = useFormatter()
  const gte = getActualEndTimeGTE(date)
  const lte = getActualEndTimeLTE(date)

  return (
    <Popover>
      <PopoverTrigger tabIndex={0}>
        <div className="underline decoration-1 underline-offset-4 decoration-dashed decoration-slate-400 decoration">
          {formatter.dateTime(dayjs(date).toDate(), {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            weekday: 'short'
          })}
        </div>
      </PopoverTrigger>
      <PopoverContent className="font-normal">
        <div className="space-y-4">
          <h4 className="text-sm">{t('title')}</h4>

          <div className="space-y-4">
            <div className="space-y-2">
              <h5 className="text-sm font-semibold">{t('period')}</h5>
              <div className="grid grid-cols-[4rem_1fr] gap-2 text-sm">
                <div className="text-muted-foreground">{t('start')}</div>
                <div>
                  {formatter.dateTime(gte, {
                    dateStyle: 'medium',
                    timeStyle: 'short'
                  })}
                </div>
                <div className="text-muted-foreground">{t('end')}</div>
                <div>
                  {formatter.dateTime(lte, {
                    dateStyle: 'medium',
                    timeStyle: 'short'
                  })}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="text-sm font-semibold">{t('criteria')}</h5>
              <div className="rounded-md bg-muted px-3 py-2 text-xs text-center">
                {t('criteriaDescription')}
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
