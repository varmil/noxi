import { useFormatter } from 'next-intl'
import {
  ChartConfig,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import ChartTooltipFormatter from 'components/chart/ChartTooltipFormatter'
import { NUMBER_FORMAT } from 'features/channel/utils/SupersChartNumberFormat'
import type { NameType } from 'recharts/types/component/DefaultTooltipContent'

export default function SupersChartTooltip({
  config
}: {
  config: ChartConfig
}) {
  const format = useFormatter()

  return (
    <ChartTooltip
      content={
        <ChartTooltipContent
          className="w-[165px] sm:w-[180px]"
          formatter={(value, name) => {
            const key = name as string
            return (
              <ChartTooltipFormatter
                indicatorColor={name}
                name={(config[key]?.label as NameType) || name}
                value={format.number(value as number, NUMBER_FORMAT)}
              />
            )
          }}
        />
      }
    />
  )
}
