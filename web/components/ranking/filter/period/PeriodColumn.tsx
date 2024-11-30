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
        <SelectButton qsKey={QS_KEY} qsValue="last24Hours">
          {tg('last24Hours')}
        </SelectButton>
        <SelectButton qsKey={QS_KEY} qsValue="last7Days">
          {tg('last7Days')}
        </SelectButton>
        <SelectButton qsKey={QS_KEY} qsValue="last30Days">
          {tg('last30Days')}
        </SelectButton>
        <SelectButton qsKey={QS_KEY} qsValue="last1Year">
          {tg('last1Year')}
        </SelectButton>
      </ColumnContent>
    </Column>
  )
}
