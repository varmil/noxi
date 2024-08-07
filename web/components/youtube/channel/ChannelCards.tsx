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
import ChannelCard from 'components/youtube/channel/ChannelCard'
import { ChannelsSchema } from 'features/youtube/types/channelSchema'

type Props = {
  channels: ChannelsSchema
}

export async function ChannelCards({ channels }: PropsWithoutRef<Props>) {
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
            thumbnails={thumbnails}
            totalViewCount={statistics.viewCount}
            subscriberCount={statistics.subscriberCount}
            publishedAt={publishedAt}
          />
        )
      })}
    </section>
  )
}
