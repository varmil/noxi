import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import { getStreamsCount } from 'apis/youtube/getStreams'
import { LinkTabs } from 'components/link-tabs/LinkTabs'
import { PageSMPX } from 'components/page'
import ResponsivePagination from 'components/pagination/ResponsivePagination'
import { StreamGalleryPagination } from 'config/constants/Pagination'
import {
  Section,
  Sections
} from 'features/channel/components/container/ChannelSection'
import EndedStreamGallery from 'features/group/ended/components/EndedStreamGallery'
import LiveStreamGallery from 'features/group/live/components/LiveStreamGallery'
import ScheduledStreamGallery from 'features/group/scheduled/components/ScheduledStreamGallery'
import { StreamGallerySearchParams } from 'features/group/types/stream-gallery'
import { getGroup } from 'lib/server-only-context/cache'

type Props = { id: string; searchParams: StreamGallerySearchParams }

export async function ChannelsIdLiveTemplate({
  id,
  searchParams
}: PropsWithoutRef<Props>) {
  const [page, feat, count] = await Promise.all([
    getTranslations('Page.group.channelsId.live'),
    getTranslations('Features.channel'),
    getStreamsCount({ channelId: id, status: 'ended' })
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
            ignoreSearchParams
          />
        }
      >
        {Number(searchParams.page || 1) === 1 && (
          <div className="flex flex-col gap-1 lg:gap-2">
            <LiveStreamGallery
              className="flex-1"
              showHeader
              where={{ group, channelId: id }}
              limit={1}
              nullIfNoLive
            />
            <ScheduledStreamGallery
              className="flex-1"
              showHeader
              where={{ group, channelId: id }}
              limit={1}
              nullIfNoLive
            />
          </div>
        )}
        <section className={`space-y-4`}>
          <EndedStreamGallery
            showHeader
            where={{ group, channelId: id }}
            {...searchParams}
          />
          <section className={`${PageSMPX}`}>
            <ResponsivePagination
              totalPages={StreamGalleryPagination.getTotalPages(count)}
            />
          </section>
        </section>
      </Section>
    </Sections>
  )
}
