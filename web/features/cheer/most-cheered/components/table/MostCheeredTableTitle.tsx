import { PropsWithChildren } from 'react'
import { useTranslations } from 'next-intl'
import PeriodHoverCardFactory from 'components/ranking/hover-card/RankingPeriodHoverCardFactory'
import { GroupString } from 'config/constants/Group'
import { Gender } from 'types/gender'
import { MostCheeredPeriod } from 'types/period'

type Props = PropsWithChildren<{
  period: MostCheeredPeriod
  group?: GroupString
  gender?: Gender
  date?: Date
  className?: string
}>

export default function MostCheeredTableTitle({
  period,
  group,
  gender,
  date,
  className
}: Props) {
  const global = useTranslations('Global')
  const title = useTranslations('Features.mostCheered.dimension')(
    `most-cheered`,
    {
      period: global(`period.${period}`),
      group: group ? global(`group.${group}`) : 'VTuber',
      gender: gender ? global(`gender.${gender}`) : ''
    }
  )
    .replace(/\s+/g, ' ')
    .trim()
  return (
    <section className={`flex ${className || ''}`}>
      <div className="flex flex-col gap-y-2 sm:w-full sm:flex-row sm:justify-between sm:items-center">
        <h1
          title={title}
          className="flex items-center text-lg sm:text-xl font-bold"
          aria-label={title}
        >
          <div className="flex gap-x-1 sm:gap-x-2 items-center">
            <span className="tracking-tighter line-clamp-1 break-all">
              {title}
            </span>
          </div>
        </h1>

        <div className="flex items-baseline gap-x-3">
          <PeriodHoverCardFactory period={period} date={date} />
        </div>
      </div>
    </section>
  )
}
