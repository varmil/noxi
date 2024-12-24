import { PropsWithoutRef } from 'react'
import { useTranslations } from 'next-intl'
import SelectButton from 'components/ranking/filter/button/SelectButton'
import {
  Column,
  ColumnHeader,
  ColumnContent
} from 'components/ranking/filter/column/Column'
import { RankingPeriod } from 'types/ranking'

const QS_KEY = 'period'

const RESET_KEYS = {
  date: null,
  page: null
}

type Keys = RankingPeriod

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
          <SelectButton key={key} qs={{ [QS_KEY]: key, ...RESET_KEYS }}>
            {tg(`period.${key}`)}
          </SelectButton>
        ))}
      </ColumnContent>
    </Column>
  )
}
