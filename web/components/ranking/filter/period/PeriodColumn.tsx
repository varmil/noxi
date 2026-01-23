'use client'

import { PropsWithoutRef } from 'react'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import SelectButton from 'components/ranking/filter/button/SelectButton'
import {
  Column,
  ColumnHeader,
  ColumnContent
} from 'components/ranking/filter/column/Column'
import { usePathname } from 'lib/navigation'
import { Period } from 'types/period'

const RESET_KEYS = {
  date: null,
  page: null
}

// PeriodColumnはスナップショット期間（weekly-xxx, monthly-xxx）をサポートしない
// スナップショットはUI選択ではなくURLから直接アクセスするため
// StreamRankingPeriod に SnapshotPeriod が含まれるため、明示的に除外
type Keys = Period | 'realtime'

type Props = PropsWithoutRef<{
  keys: Keys[]
}>

export default function PeriodColumn({ keys }: Props) {
  const { period } = useParams()
  const pathname = usePathname()
  const tg = useTranslations('Global')

  return (
    <Column>
      <ColumnHeader>{tg('ranking.filter.period')}</ColumnHeader>
      <ColumnContent>
        {keys.map(key => (
          <SelectButton
            key={key}
            qs={{ ...RESET_KEYS }}
            pathname={pathname.replace(period as string, key)}
            isActive={() => period === key}
            activeVariant="secondary"
          >
            {tg(`period.${key}`)}
          </SelectButton>
        ))}
      </ColumnContent>
    </Column>
  )
}
