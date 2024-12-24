import { PropsWithoutRef } from 'react'
import { useTranslations } from 'next-intl'
import SelectButton from 'components/ranking/filter/button/SelectButton'
import {
  Column,
  ColumnHeader,
  ColumnContent
} from 'components/ranking/filter/column/Column'

const QS_KEY = 'dimension'

// Dimensionを変えたらPeriodも追加でリセット
const RESET_KEYS = {
  period: null,
  date: null,
  page: null
}

type Keys = 'concurrent-viewer' | 'super-chat' | 'subscriber'

type Props = PropsWithoutRef<{
  keys: Keys[]
  className?: string
}>

export default function DimensionColumn({ keys, className }: Props) {
  const tg = useTranslations('Global.ranking')
  return (
    <Column>
      <ColumnHeader>{tg('filter.dimension')}</ColumnHeader>
      <ColumnContent>
        {keys.map(key => (
          <SelectButton key={key} qs={{ [QS_KEY]: key, ...RESET_KEYS }}>
            {tg(`dimension.${key}`)}
          </SelectButton>
        ))}
      </ColumnContent>
    </Column>
  )
}
