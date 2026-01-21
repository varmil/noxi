'use client'

import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Badge } from '@/components/ui/badge'
import SelectButton from 'components/ranking/filter/button/SelectButton'
import {
  Column,
  ColumnHeader,
  ColumnContent
} from 'components/ranking/filter/column/Column'
import { DefaultPeriodByDimension } from 'config/constants/RankingRoute'
import { usePathname } from 'lib/navigation'
import { Dimension } from 'types/dimension'

type Keys = Dimension

// Dimensionを変えたらすべて（period, group, gender）も追加でリセット
const RESET_KEYS = () => ({
  gender: null,
  date: null,
  page: null
})

const resetGroup = () => {
  return 'all'
}

const resetPeriod = (dimension: Keys) => {
  return DefaultPeriodByDimension[dimension]
}

const CHEER_KEYS = ['most-cheered', 'top-fans'] as const
const CHANNELS_KEYS = ['super-chat', 'subscriber'] as const
const STREAM_KEYS = ['concurrent-viewer'] as const

export default function DimensionColumn() {
  const { dimension } = useParams()
  const pathname = usePathname()
  const tg = useTranslations('Global.ranking')
  return (
    <Column>
      <ColumnHeader>{tg('filter.dimension')}</ColumnHeader>
      <ColumnContent>
        <Label label="Channels" className="my-1.5" />
        {CHANNELS_KEYS.map(key => (
          <SelectButton
            key={key}
            pathname={`/ranking/${key}/channels/${resetGroup()}/${resetPeriod(key)}`}
            qs={{ ...RESET_KEYS() }}
            isActive={() =>
              (pathname.includes('channels') && key === dimension) ||
              (pathname.includes('live') && key === dimension)
            }
            activeVariant="secondary"
          >
            {tg(`dimension.${key}`)}
          </SelectButton>
        ))}

        <Label label="Live" className="my-1.5" />
        {STREAM_KEYS.map(key => (
          <SelectButton
            key={key}
            pathname={`/ranking/${key}/live/${resetGroup()}/${resetPeriod(key)}`}
            qs={{ ...RESET_KEYS() }}
            isActive={() => pathname.includes('live') && key === dimension}
            activeVariant="secondary"
          >
            {tg(`dimension.${key}`)}
          </SelectButton>
        ))}

        <Label label="Cheer" className="mb-1.5" />
        {CHEER_KEYS.map(key => (
          <SelectButton
            key={key}
            pathname={`/ranking/${key}/${resetGroup()}/${resetPeriod(key)}`}
            qs={{ ...RESET_KEYS() }}
            isActive={() => pathname.includes(`/ranking/${key}/`)}
            activeVariant="secondary"
          >
            <div>
              <span>{tg(`dimension.${key}`)}</span>
              <Badge className="ml-0.5 px-1.5 bg-linear-to-r from-blue-500 to-violet-500 text-white font-bold">
                β
              </Badge>
            </div>
          </SelectButton>
        ))}
      </ColumnContent>
    </Column>
  )
}

const Label = ({ label, className }: { label: string; className?: string }) => (
  <div className={`text-muted-foreground text-xs ${className}`}>{label}</div>
)
