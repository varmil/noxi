import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import {
  Section,
  Sections
} from 'features/channel/components/container/ChannelContainer'
import ChannelSuperChatCards from 'features/channel/components/super-chat/ChannelSuperChatCards'
import PeriodTabs from 'features/period-tab/components/PeriodTabs'

type Props = { id: string }

export async function ChannelsIdSuperChatTemplate({
  id
}: PropsWithoutRef<Props>) {
  const [t] = await Promise.all([
    getTranslations('Page.group.channelsId.superChat')
  ])

  return (
    <section className="flex flex-1 flex-col gap-4">
      <Sections>
        <Section title={t('section.title')}>
          <ChannelSuperChatCards channelId={id} />
        </Section>
      </Sections>

      {/* TODO: タブごとにチャート表示したい */}
      <PeriodTabs />
    </section>
  )
}
