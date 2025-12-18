import { PropsWithChildren, Suspense } from 'react'
import { getGroups } from 'apis/groups'
import { LookerReport } from 'components/looker/LookerReport'
import { ChartFilters } from 'features/charts/components/ChartFilters'
import { DaysOption, DEFAULT_DAYS } from 'features/charts/types/chart-filter'
import {
  StreamVolumeTrendContainer,
  StreamVolumeTrendSkeleton
} from 'features/stream-volume-trend'
import LiveStatsCards from './ui/live-stats/LiveStatsCards'

const CHART_2_URL =
  'https://lookerstudio.google.com/embed/reporting/10cf9721-c85a-478c-bf93-e9a9ae204092/page/p_7lmqygy0yd'
const WEEKNUM_URL =
  'https://lookerstudio.google.com/embed/reporting/10cf9721-c85a-478c-bf93-e9a9ae204092/page/p_guu27y80yd'
const GOLDENTIME_URL =
  'https://lookerstudio.google.com/embed/reporting/10cf9721-c85a-478c-bf93-e9a9ae204092/page/p_orwwr0z0yd'
const CHANNEL_RANKING_URL =
  'https://lookerstudio.google.com/embed/reporting/10cf9721-c85a-478c-bf93-e9a9ae204092/page/p_2haikz50yd'
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
      className={`w-full flex flex-col md:flex-row items-center justify-center ${props.className}`}
    >
      {props.children}
    </div>
  )
}

export async function IndexTemplate({ days = DEFAULT_DAYS, group }: Props) {
  const groups = await getGroups()

  return (
    <>
      <Container className="flex flex-col gap-6">
        {/* ライブ統計カード（Above the fold） */}
        <LiveStatsCards />

        {/* 共通フィルター */}
        <ChartFilters groups={groups} />

        <FlexSection className="gap-6">
          <div className="flex-1 w-full">
            <Suspense
              key={`${days}-${group}`}
              fallback={<StreamVolumeTrendSkeleton />}
            >
              <StreamVolumeTrendContainer days={days} group={group} />
            </Suspense>
          </div>
          <div className="flex-1 w-full">
            <LookerReport
              reportUrl={CHART_2_URL}
              className="h-[350px]"
              lazy={true}
            />
          </div>
        </FlexSection>

        {/* 以下は遅延読み込み */}
        <FlexSection className="items-start gap-6">
          <LookerReport
            reportUrl={WEEKNUM_URL}
            className="h-[410px]"
            lazy={true}
          />
          <LookerReport
            reportUrl={GOLDENTIME_URL}
            className="h-[568px]"
            lazy={true}
          />
        </FlexSection>

        <div>
          <LookerReport
            reportUrl={CHANNEL_RANKING_URL}
            className="h-[400px] xl:h-[490px]"
            lazy={true}
          />
        </div>

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
