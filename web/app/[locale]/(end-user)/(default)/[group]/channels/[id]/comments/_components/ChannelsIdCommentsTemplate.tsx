import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import { ChannelCommentTabs } from 'app/[locale]/(end-user)/(default)/[group]/channels/[id]/_components/ui/latest-user-reactions/ChannelCommentTabs'
import {
  Section,
  Sections
} from 'features/channel/components/container/ChannelSection'

type Props = { id: string }

export async function ChannelsIdCommentsTemplate({
  id
}: PropsWithoutRef<Props>) {
  const [page] = await Promise.all([
    getTranslations('Page.group.channelsId.comments')
  ])

  return (
    <Sections>
      <Section title={page('section.title')}>
        <ChannelCommentTabs channelId={id} />
      </Section>
    </Sections>
  )
}
