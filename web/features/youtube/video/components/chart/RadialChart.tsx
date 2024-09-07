'use client'

import { PropsWithoutRef, SVGProps } from 'react'
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts'
import { ChartConfig, ChartContainer } from '@/components/ui/chart'
import type { LucideProps } from 'lucide-react'

type Props = {
  config: ChartConfig
  Icon:
    | React.ForwardRefExoticComponent<
        Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
      >
    | React.ComponentType<SVGProps<SVGSVGElement>>
  rate: number
  maxRate: number
}

const INNER_R = 8 * 4
const OUTER_R = 13 * 4

export function RadialChart({
  config,
  Icon,
  rate,
  maxRate
}: PropsWithoutRef<Props>) {
  const chartData = [{ rate }]
  const maxRateForBG = Math.max(0, maxRate - rate)

  return (
    <section className="flex flex-col">
      <div className="flex items-center pb-0">
        <ChartContainer
          config={config}
          className="aspect-video mx-auto w-full min-h-[50px] max-w-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={180}
            endAngle={0}
            innerRadius={INNER_R}
            outerRadius={OUTER_R}
            cy={'72%'}
          >
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    const { cx = 0, cy = 0 } = viewBox
                    return (
                      <>
                        <Icon
                          className="text-muted-foreground"
                          height={12}
                          width={12}
                          x={cx - 26}
                          y={cy + 2}
                        />
                        <text x={cx} y={cy} textAnchor="middle">
                          <tspan
                            x={cx}
                            y={cy - 3}
                            className="fill-foreground text-xs font-bold"
                          >
                            {!!rate ? rate.toFixed(2) + '%' : '--'}
                          </tspan>
                          <tspan
                            x={cx + 7}
                            y={cy + 12}
                            className="fill-muted-foreground text-xs"
                          >
                            / views
                          </tspan>
                        </text>
                      </>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="rate"
              fill="var(--color-main)"
              stackId="xxx"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
              background
            />
            <RadialBar
              dataKey={() => maxRateForBG}
              tooltipType="none"
              stroke="none"
              stackId="xxx"
              cornerRadius={5}
              className="fill-muted"
            />
          </RadialBarChart>
        </ChartContainer>
      </div>
    </section>
  )
}
