'use client'

import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
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

// 表示順: スパチャ金額 → 同接数 → チャンネル登録者数
const DIMENSION_ITEMS = [
  { key: 'super-chat', type: 'channels' },
  { key: 'concurrent-viewer', type: 'live' },
  { key: 'subscriber', type: 'channels' }
] as const

export default function DimensionColumn() {
  const { dimension } = useParams()
  const pathname = usePathname()
  const tg = useTranslations('Global.ranking')
  return (
    <Column>
      <ColumnHeader>{tg('filter.dimension')}</ColumnHeader>
      <ColumnContent>
        {DIMENSION_ITEMS.map(({ key, type }) => (
          <SelectButton
            key={key}
            pathname={`/ranking/${key}/${type}/${resetGroup()}/${resetPeriod(key)}`}
            qs={{ ...RESET_KEYS() }}
            isActive={() =>
              key === 'super-chat'
                ? (pathname.includes('channels') && key === dimension) ||
                  (pathname.includes('live') && key === dimension)
                : type === 'live'
                  ? pathname.includes('live') && key === dimension
                  : pathname.includes('channels') && key === dimension
            }
          >
            {tg(`dimension.${key}`)}
          </SelectButton>
        ))}

        <div className="py-2 px-4">
          <Separator />
        </div>

        {CHEER_KEYS.map(key => (
          <SelectButton
            key={key}
            pathname={`/ranking/${key}/${resetGroup()}/${resetPeriod(key)}`}
            qs={{ ...RESET_KEYS() }}
            isActive={() => pathname.includes(`/ranking/${key}/`)}
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
