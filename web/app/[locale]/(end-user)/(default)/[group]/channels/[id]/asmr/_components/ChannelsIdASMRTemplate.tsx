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
import { StreamGallerySearchParams } from 'features/group/types/stream-gallery'
import { getGroup } from 'lib/server-only-context/cache'

type Props = { id: string; searchParams: StreamGallerySearchParams }

export async function ChannelsIdASMRTemplate({
  id,
  searchParams
}: PropsWithoutRef<Props>) {
  const group = getGroup()
  const [page, feat, count] = await Promise.all([
    getTranslations('Page.group.channelsId.live'),
    getTranslations('Features.channel'),
    getStreamsCount({
      title: 'ASMR',
      group,
      channelId: id,
      status: 'ended'
    })
  ])

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
        <section className={`space-y-4`}>
          <EndedStreamGallery
            where={{ title: 'ASMR', group, channelId: id }}
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
