'use client'

import { PropsWithoutRef, useState } from 'react'
import SelectButton from 'components/ranking/filter/button/SelectButton'
import {
  Column,
  ColumnHeader,
  ColumnContent
} from 'components/ranking/filter/column/Column'

type Props = PropsWithoutRef<{
  className?: string
}>

export default function PeriodColumn({ className }: Props) {
  const [period, setPeriod] = useState('real-time')

  return (
    <Column>
      <ColumnHeader>期間</ColumnHeader>
      <ColumnContent>
        <SelectButton
          variant={period === 'real-time' ? 'default' : 'ghost'}
          onClick={() => setPeriod('real-time')}
        >
          リアルタイム
        </SelectButton>
        <SelectButton
          variant={period === 'daily' ? 'default' : 'ghost'}
          onClick={() => setPeriod('daily')}
        >
          今日
        </SelectButton>
        <SelectButton
          variant={period === 'weekly' ? 'default' : 'ghost'}
          onClick={() => setPeriod('weekly')}
        >
          過去７日間
        </SelectButton>
        <SelectButton
          variant={period === 'monthly' ? 'default' : 'ghost'}
          onClick={() => setPeriod('monthly')}
        >
          過去３０日間
        </SelectButton>
        <SelectButton
          variant={period === 'yearly' ? 'default' : 'ghost'}
          onClick={() => setPeriod('yearly')}
        >
          今年
        </SelectButton>
      </ColumnContent>
    </Column>
  )
}
