import { PropsWithoutRef } from 'react'
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
  return (
    <Column>
      <ColumnHeader>期間</ColumnHeader>
      <ColumnContent>
        <SelectButton
          qsKey={QS_KEY}
          qsValue="real-time"
          // variant={period === 'real-time' ? 'default' : 'ghost'}
          // onClick={() => setPeriod('real-time')}
        >
          リアルタイム
        </SelectButton>
        <SelectButton
          qsKey={QS_KEY}
          qsValue="daily"
          // variant={period === 'daily' ? 'default' : 'ghost'}
          // onClick={() => setPeriod('daily')}
        >
          今日
        </SelectButton>
        <SelectButton
          qsKey={QS_KEY}
          qsValue="weekly"
          // variant={period === 'weekly' ? 'default' : 'ghost'}
          // onClick={() => setPeriod('weekly')}
        >
          過去７日間
        </SelectButton>
        <SelectButton
          qsKey={QS_KEY}
          qsValue="monthly"
          // variant={period === 'monthly' ? 'default' : 'ghost'}
          // onClick={() => setPeriod('monthly')}
        >
          過去３０日間
        </SelectButton>
        <SelectButton
          qsKey={QS_KEY}
          qsValue="yearly"
          // variant={period === 'yearly' ? 'default' : 'ghost'}
          // onClick={() => setPeriod('yearly')}
        >
          今年
        </SelectButton>
      </ColumnContent>
    </Column>
  )
}
