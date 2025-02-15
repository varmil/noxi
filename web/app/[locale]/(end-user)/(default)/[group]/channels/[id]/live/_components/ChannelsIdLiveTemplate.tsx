import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import { LinkTabs } from 'components/link-tabs/LinkTabs'
import {
  Section,
  Sections
} from 'features/channel/components/container/ChannelSection'
import EndedStreamGallery from 'features/group/ended/components/EndedStreamGallery'
import LiveStreamGallery from 'features/group/live/components/LiveStreamGallery'
import ScheduledStreamGallery from 'features/group/scheduled/components/ScheduledStreamGallery'
import { getGroup } from 'lib/server-only-context/cache'

type Props = { id: string }

export async function ChannelsIdLiveTemplate({ id }: PropsWithoutRef<Props>) {
  const [page, feat] = await Promise.all([
    getTranslations('Page.group.channelsId.live'),
    getTranslations('Features.channel')
  ])
  const group = getGroup()

  return (
    <Sections>
      <Section
        title={page('section.title')}
        tabs={
          <LinkTabs
            className="min-w-44 sm:min-w-64"
            tabs={[
              {
                label: feat('live.nav'),
                href: `/${group}/channels/${id}/live`
              },
              {
                label: feat('asmr.nav'),
                href: `/${group}/channels/${id}/asmr`
              }
            ]}
          />
        }
      >
        <div className="flex flex-col gap-1 sm:flex-row sm:gap-2">
          <LiveStreamGallery
            className="flex-1"
            showHeader
            where={{ group, channelId: id }}
            limit={1}
          />
          <ScheduledStreamGallery
            className="flex-1"
            showHeader
            where={{ group, channelId: id }}
            limit={1}
          />
        </div>
        <EndedStreamGallery showHeader where={{ group, channelId: id }} />
      </Section>
    </Sections>
  )
}
