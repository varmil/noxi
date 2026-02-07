import { PropsWithChildren, Suspense } from 'react'
import { getGroups } from 'apis/groups'
import { LookerReport } from 'components/looker/LookerReport'
import {
  ChannelGrowthRankingContainer,
  ChannelGrowthRankingSkeleton
} from 'features/channel-growth-ranking'
import { ChartFilters } from 'features/charts/components/ChartFilters'
import { DaysOption, DEFAULT_DAYS } from 'features/charts/types/chart-filter'
import {
  ConcurrentViewerTrendContainer,
  ConcurrentViewerTrendSkeleton
} from 'features/concurrent-viewer-trend'
import {
  DayOfWeekDistributionContainer,
  DayOfWeekDistributionSkeleton
} from 'features/day-of-week-distribution'
import { GoldenTimeContainer, GoldenTimeSkeleton } from 'features/golden-time'
import {
  StreamVolumeTrendContainer,
  StreamVolumeTrendSkeleton
} from 'features/stream-volume-trend'
import LiveStatsCards from './ui/live-stats/LiveStatsCards'
const SCATTER_URL =
  'https://lookerstudio.google.com/embed/reporting/10cf9721-c85a-478c-bf93-e9a9ae204092/page/p_iyv78oa1yd'

type Props = {
  days?: DaysOption
  group?: string
}

const Container = (props: PropsWithChildren<{ className?: string }>) => {
  return (
    <div className={`container px-0 py-2 md:px-4 md:py-4 ${props.className}`}>
      {props.children}
    </div>
  )
}

const FlexSection = (props: PropsWithChildren<{ className?: string }>) => {
  return (
    <div
      className={`w-full flex flex-col lg:flex-row items-center justify-center ${props.className}`}
    >
      {props.children}
    </div>
  )
}

export async function IndexTemplate({ days = DEFAULT_DAYS, group }: Props) {
  const groups = await getGroups()

  return (
    <>
      <h1 className="sr-only">VTuberランキング・統計 - VCharts</h1>
      <Container className="flex flex-col gap-6">
        {/* ライブ統計カード（Above the fold） */}
        <section className="w-full">
          <LiveStatsCards />
        </section>

        {/* 共通フィルター */}
        <ChartFilters groups={groups} />

        <div>
          <Suspense
            key={`channel-growth-${days}-${group}`}
            fallback={<ChannelGrowthRankingSkeleton />}
          >
            <ChannelGrowthRankingContainer days={days} group={group} />
          </Suspense>
        </div>

        <FlexSection className="gap-6">
          <div className="flex-1 w-full">
            <Suspense
              key={`stream-${days}-${group}`}
              fallback={<StreamVolumeTrendSkeleton />}
            >
              <StreamVolumeTrendContainer days={days} group={group} />
            </Suspense>
          </div>
          <div className="flex-1 w-full">
            <Suspense
              key={`concurrent-${days}-${group}`}
              fallback={<ConcurrentViewerTrendSkeleton />}
            >
              <ConcurrentViewerTrendContainer days={days} group={group} />
            </Suspense>
          </div>
        </FlexSection>

        {/* 以下は遅延読み込み */}
        <FlexSection className="items-start gap-6">
          <div className="flex-1 w-full">
            <Suspense
              key={`dow-${days}-${group}`}
              fallback={<DayOfWeekDistributionSkeleton />}
            >
              <DayOfWeekDistributionContainer days={days} group={group} />
            </Suspense>
          </div>
          <div className="flex-1 w-full">
            <Suspense
              key={`golden-${days}-${group}`}
              fallback={<GoldenTimeSkeleton />}
            >
              <GoldenTimeContainer days={days} group={group} />
            </Suspense>
          </div>
        </FlexSection>

        <div>
          <LookerReport
            reportUrl={SCATTER_URL}
            className="h-[480px] xl:h-[500px] 2xl:h-[530px]"
            lazy={true}
          />
        </div>
      </Container>
    </>
  )
}
