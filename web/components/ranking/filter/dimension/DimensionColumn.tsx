import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import SelectButton from 'components/ranking/filter/button/SelectButton'
import {
  Column,
  ColumnHeader,
  ColumnContent
} from 'components/ranking/filter/column/Column'
import { DefaultPeriodByDimension } from 'config/constants/RankingRoute'
import { auth } from 'lib/auth'
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

const CHEER_KEYS = ['most-cheered', 'top-fans'] as const
const CHANNELS_KEYS = ['super-chat', 'subscriber'] as const
const STREAM_KEYS = ['concurrent-viewer', 'super-chat'] as const

export default async function DimensionColumn({ className }: Props) {
  const tg = await getTranslations('Global.ranking')
  const session = await auth()
  return (
    <Column>
      <ColumnHeader>{tg('filter.dimension')}</ColumnHeader>
      <ColumnContent>
        {/* NOTE: リリース時は条件削除 */}
        {session ? (
          <>
            <Label label="Cheer" className="mb-1.5" />
            {CHEER_KEYS.map(key => (
              <SelectButton
                key={key}
                pathname={`/ranking/${key}`}
                qs={{ [QS_KEY]: null, ...RESET_KEYS(key) }}
              >
                {tg(`dimension.${key}`)}
              </SelectButton>
            ))}
          </>
        ) : null}

        {/* NOTE: リリース時はmy-1.5 */}
        <Label label="Channels" className="mb-1.5" />
        {CHANNELS_KEYS.map(key => (
          <SelectButton
            key={key}
            pathname={'/ranking/channels'}
            qs={{ [QS_KEY]: key, ...RESET_KEYS(key) }}
          >
            {tg(`dimension.${key}`)}
          </SelectButton>
        ))}

        <Label label="Live" className="my-1.5" />
        {STREAM_KEYS.map(key => (
          <SelectButton
            key={key}
            pathname={'/ranking/live'}
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
