import { PropsWithoutRef } from 'react'
import { useTranslations } from 'next-intl'
import SelectButton from 'components/ranking/filter/button/SelectButton'
import {
  Column,
  ColumnHeader,
  ColumnContent
} from 'components/ranking/filter/column/Column'
import { DefaultPeriodByDimension } from 'config/constants/RankingRoute'
import { Dimension } from 'types/dimension'

const QS_KEY = 'dimension'

type Keys = Dimension

type Props = PropsWithoutRef<{
  keys: Keys[]
  className?: string
}>

// Dimensionを変えたらPeriodも追加でリセット
const RESET_KEYS = (dimension: Keys) => ({
  period: DefaultPeriodByDimension[dimension],
  date: null,
  page: null
})

export default function DimensionColumn({ keys, className }: Props) {
  const tg = useTranslations('Global.ranking')
  return (
    <Column>
      <ColumnHeader>{tg('filter.dimension')}</ColumnHeader>
      <ColumnContent>
        {keys.map(key => (
          <SelectButton key={key} qs={{ [QS_KEY]: key, ...RESET_KEYS(key) }}>
            {tg(`dimension.${key}`)}
          </SelectButton>
        ))}
      </ColumnContent>
    </Column>
  )
}
