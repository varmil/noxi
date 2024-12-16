import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import { getSupersSummaryHistories } from 'apis/youtube/getSupersSummaryHistories'
import {
  Section,
  Sections
} from 'features/channel/components/container/ChannelContainer'
import ChannelSupersCards from 'features/channel/components/super-chat/ChannelSupersCards'
import ThisMonthsCumulativeSupersChart from 'features/channel/components/super-chat/chart/ThisMonthsCumulativeSupersChart'
import dayjs from 'lib/dayjs'

type Props = { id: string }

export async function ChannelsIdSuperChatTemplate({
  id
}: PropsWithoutRef<Props>) {
  const [t, supersSummaryHistories] = await Promise.all([
    getTranslations('Page.group.channelsId.superChat'),
    // For this months cumulative chart
    getSupersSummaryHistories({
      channelId: id,
      createdAfter: dayjs().startOf('month').toDate(),
      createdBefore: new Date()
    })
  ])

  return (
    <Sections>
      <Section title={t('section.card.title')}>
        <ChannelSupersCards channelId={id} />
      </Section>

      <Section title={t('section.monthlyChart.title')}>
        <ThisMonthsCumulativeSupersChart
          supersSummaryHistories={supersSummaryHistories}
        />
      </Section>
    </Sections>
  )
}
