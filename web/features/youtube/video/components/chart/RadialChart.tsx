'use client'

import { PropsWithoutRef } from 'react'
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'

type Props = {
  config: ChartConfig
  name: string
  rate: number
  maxRate: number
}

const INNER_R = 8 * 4
const OUTER_R = 13 * 4

export function RadialChart({
  config,
  name,
  rate,
  maxRate
}: PropsWithoutRef<Props>) {
  const chartData = [{ name, rate }]
  const maxRateForBG = Math.max(0, maxRate - rate)

  return (
    <section className="flex flex-col">
      <div className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={config}
          className="aspect-[16/11.5] mx-auto w-full min-h-[50px] max-w-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={180}
            endAngle={0}
            innerRadius={INNER_R}
            outerRadius={OUTER_R}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 8}
                          className="fill-foreground text-xs font-bold"
                        >
                          {!!rate ? rate.toFixed(2) : 0}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 5}
                          className="fill-muted-foreground text-xs"
                        >
                          {name}
                        </tspan>
                      </text>
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
