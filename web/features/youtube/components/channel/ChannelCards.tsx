/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import { PropsWithoutRef } from 'react'
import { getChartOfChannels } from 'features/youtube/api/getChartOfChannels'
import ChannelCard from 'features/youtube/components/channel/ChannelCard'

type Props = {
  searchParams: URLSearchParams
}

export async function ChannelCards({ searchParams }: PropsWithoutRef<Props>) {
  const channels = await getChartOfChannels({ searchParams })

  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {channels.map(channel => {
        const {
          basicInfo: { id, title, description, thumbnails, publishedAt },
          statistics,
          brandingSettings
        } = channel
        return (
          <ChannelCard
            key={id}
            id={id}
            name={title}
            description={description}
            src={thumbnails['medium'].url}
            totalViewCount={statistics.viewCount}
            subscriberCount={statistics.subscriberCount}
            publishedAt={publishedAt}
          />
        )
      })}
    </section>
  )
}
