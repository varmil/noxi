import { PropsWithChildren, PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import { LookerReport } from 'components/looker/LookerReport'

const LIVE_COUNT_URL =
  'https://lookerstudio.google.com/embed/reporting/10cf9721-c85a-478c-bf93-e9a9ae204092/page/p_mmo7wnz0yd'
const VIEWER_URL =
  'https://lookerstudio.google.com/embed/reporting/10cf9721-c85a-478c-bf93-e9a9ae204092/page/p_d54aooz0yd'
const CHART_1_URL =
  'https://lookerstudio.google.com/embed/reporting/10cf9721-c85a-478c-bf93-e9a9ae204092/page/p_kzw7z6x0yd'
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

type Props = {}

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

export async function IndexTemplate({}: PropsWithoutRef<Props>) {
  const t = await getTranslations('Page.index')
  return (
    <>
      <Container className="flex flex-col gap-6">
        <FlexSection className="flex-row gap-2 md:gap-6">
          <div className="flex-1 w-full">
            <LookerReport reportUrl={LIVE_COUNT_URL} className="h-[120px]" />
          </div>
          <div className="flex-1 w-full">
            <LookerReport reportUrl={VIEWER_URL} className="h-[120px]" />
          </div>
        </FlexSection>

        <FlexSection className="gap-6">
          <div className="flex-1 w-full">
            <LookerReport reportUrl={CHART_1_URL} className="h-[350px]" />
          </div>
          <div className="flex-1 w-full">
            <LookerReport reportUrl={CHART_2_URL} className="h-[350px]" />
          </div>
        </FlexSection>

        <FlexSection className="items-start gap-6">
          <LookerReport reportUrl={WEEKNUM_URL} className="h-[410px]" />
          <LookerReport reportUrl={GOLDENTIME_URL} className="h-[568px]" />
        </FlexSection>

        <div>
          <LookerReport
            reportUrl={CHANNEL_RANKING_URL}
            className="h-[400px] xl:h-[490px]"
          />
        </div>

        <div>
          <LookerReport
            reportUrl={SCATTER_URL}
            className="h-[480px] xl:h-[500px] 2xl:h-[530px]"
          />
        </div>
      </Container>
    </>
  )
}
