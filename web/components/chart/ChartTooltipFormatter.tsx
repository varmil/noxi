import type { NameType } from 'recharts/types/component/DefaultTooltipContent'

type Value = string | number | (string | number)[]

export default function ChartTooltipFormatter({
  indicatorColor,
  name,
  value
}: {
  indicatorColor?: NameType
  name?: NameType
  value: Value
}) {
  return (
    <>
      <div
        className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-(--color-bg)"
        style={
          {
            '--color-bg': `var(--color-${indicatorColor})`
          } as React.CSSProperties
        }
      />

      <span className="text-muted-foreground">{name}</span>
      <div className="ml-auto flex items-baseline gap-0.5 font-medium tabular-nums text-foreground">
        {value}
      </div>
    </>
  )
}

export function ChartTooltipTotal({ value }: { value: Value }) {
  return (
    <div className="mt-1.5 flex basis-full items-center border-t pt-1.5 font-medium text-foreground">
      Total
      <div className="ml-auto flex items-baseline gap-0.5 font-medium tabular-nums text-foreground">
        {value}
      </div>
    </div>
  )
}
