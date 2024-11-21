import { PropsWithoutRef } from 'react'
import { useTranslations } from 'next-intl'
import SelectButton from 'components/ranking/filter/button/SelectButton'
import {
  Column,
  ColumnHeader,
  ColumnContent
} from 'components/ranking/filter/column/Column'

const QS_KEY = 'period'

type Props = PropsWithoutRef<{
  className?: string
}>

export default function PeriodColumn({ className }: Props) {
  const tg = useTranslations('Global.ranking.period')

  return (
    <Column>
      <ColumnHeader>期間</ColumnHeader>
      <ColumnContent>
        <SelectButton qsKey={QS_KEY} qsValue="realtime">
          {tg('realtime')}
        </SelectButton>
        <SelectButton qsKey={QS_KEY} qsValue="daily">
          {tg('daily')}
        </SelectButton>
        <SelectButton qsKey={QS_KEY} qsValue="weekly">
          {tg('weekly')}
        </SelectButton>
        <SelectButton qsKey={QS_KEY} qsValue="monthly">
          {tg('monthly')}
        </SelectButton>
        <SelectButton qsKey={QS_KEY} qsValue="yearly">
          {tg('yearly')}
        </SelectButton>
      </ColumnContent>
    </Column>
  )
}
