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
  className?: string
}>

// Dimensionを変えたらPeriodも追加でリセット
const RESET_KEYS = (dimension: Keys) => ({
  period: DefaultPeriodByDimension[dimension],
  date: null,
  page: null
})

const CHANNELS_KEYS = ['super-chat', 'subscriber'] as const
const STREAM_KEYS = ['concurrent-viewer', 'super-chat'] as const

export default function DimensionColumn({ className }: Props) {
  const tg = useTranslations('Global.ranking')
  return (
    <Column>
      <ColumnHeader>{tg('filter.dimension')}</ColumnHeader>
      <ColumnContent>
        <Label label="Channels" className="mb-2" />
        {CHANNELS_KEYS.map(key => (
          <SelectButton
            key={key}
            pathname={'/youtube/channels/ranking'}
            qs={{ [QS_KEY]: key, ...RESET_KEYS(key) }}
          >
            {tg(`dimension.${key}`)}
          </SelectButton>
        ))}

        <Label label="Live" className="my-2" />
        {STREAM_KEYS.map(key => (
          <SelectButton
            key={key}
            pathname={'/youtube/live/ranking'}
            qs={{ [QS_KEY]: key, ...RESET_KEYS(key) }}
          >
            {tg(`dimension.${key}`)}
          </SelectButton>
        ))}
      </ColumnContent>
    </Column>
  )
}

const Label = ({ label, className }: { label: string; className?: string }) => (
  <div className={`text-muted-foreground text-xs ${className}`}>{label}</div>
)
