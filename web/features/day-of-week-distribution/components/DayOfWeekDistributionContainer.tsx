import { getDayOfWeekDistribution } from 'apis/youtube/getDayOfWeekDistribution'
import { DayOfWeekDistributionChart } from './DayOfWeekDistributionChart'

type DaysOption = 7 | 28 | 90

interface Props {
  days?: DaysOption
  group?: string
}

export async function DayOfWeekDistributionContainer({
  days = 28,
  group
}: Props) {
  const data = await getDayOfWeekDistribution({ days, group })

  return <DayOfWeekDistributionChart data={data} />
}
