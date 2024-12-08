import { PropsWithoutRef } from 'react'
import { useTranslations } from 'next-intl'
import { RankingPeriod } from 'types/ranking'
import SelectButton from 'components/ranking/filter/button/SelectButton'
import {
  Column,
  ColumnHeader,
  ColumnContent
} from 'components/ranking/filter/column/Column'

const QS_KEY = 'period'

type Keys = RankingPeriod

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
