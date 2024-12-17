import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import { getSupersSummaryHistories } from 'apis/youtube/getSupersSummaryHistories'
import {
  Section,
  Sections
} from 'features/channel/components/container/ChannelContainer'
import ChannelSupersCards from 'features/channel/components/super-chat/ChannelSupersCards'
import SupersCumulativeChart from 'features/channel/components/super-chat/chart/SupersCumulativeChart'
import SupersTrendsChart from 'features/channel/components/super-chat/chart/SupersTrendsChart'
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

      <Section>
        <SupersCumulativeChart
          supersSummaryHistories={supersSummaryHistories}
        />
      </Section>

      <Section>
        <SupersTrendsChart supersSummaryHistories={supersSummaryHistories} />
      </Section>
    </Sections>
  )
}
