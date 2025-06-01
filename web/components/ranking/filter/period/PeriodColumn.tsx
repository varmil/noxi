import { PropsWithoutRef } from 'react'
import { useTranslations } from 'next-intl'
import SelectButton from 'components/ranking/filter/button/SelectButton'
import {
  Column,
  ColumnHeader,
  ColumnContent
} from 'components/ranking/filter/column/Column'
import { ChannelsRankingPeriod, StreamRankingPeriod } from 'types/period'

const QS_KEY = 'period'

const RESET_KEYS = {
  date: null,
  page: null
}

const PREFETCH_KEYS = [
  'realtime',
  'last24Hours',
  'last7Days',
  'last30Days',
  'last1Year'
]

type Keys = ChannelsRankingPeriod | StreamRankingPeriod

type Props = PropsWithoutRef<{
  keys: Keys[]
  className?: string
}>

export default function PeriodColumn({ keys, className }: Props) {
  const tg = useTranslations('Global')

  return (
    <Column>
      <ColumnHeader>{tg('ranking.filter.period')}</ColumnHeader>
      <ColumnContent>
        {keys.map(key => (
          <SelectButton
            key={key}
            qs={{ [QS_KEY]: key, ...RESET_KEYS }}
            prefetch={PREFETCH_KEYS.includes(key)}
            activeVariant="secondary"
          >
            {tg(`period.${key}`)}
          </SelectButton>
        ))}
      </ColumnContent>
    </Column>
  )
}
