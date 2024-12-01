import { PropsWithoutRef } from 'react'
import { useTranslations } from 'next-intl'
import SelectButton from 'components/ranking/filter/button/SelectButton'
import {
  Column,
  ColumnHeader,
  ColumnContent
} from 'components/ranking/filter/column/Column'

const QS_KEY = 'period'

type Keys =
  | 'realtime'
  | 'last24Hours'
  | 'last7Days'
  | 'last30Days'
  | 'last1Year'
  | 'thisWeek'
  | 'thisMonth'
  | 'thisYear'
  | 'all'

type Props = PropsWithoutRef<{
  keys: Keys[]
  className?: string
}>

export default function PeriodColumn({ keys, className }: Props) {
  const tg = useTranslations('Global.ranking')

  return (
    <Column>
      <ColumnHeader>{tg('filter.period')}</ColumnHeader>
      <ColumnContent>
        {keys.map(key => (
          <SelectButton
            key={key}
            qs={{
              [QS_KEY]: key,
              // Periodを変えたらdateをリセット
              date: null
            }}
          >
            {tg(`period.${key}`)}
          </SelectButton>
        ))}
      </ColumnContent>
    </Column>
  )
}
