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
import { ChannelsSchema } from 'apis/youtube/schema/channelSchema'
import ChannelCard from 'components/youtube/channel/ChannelCard'

type Props = {
  channels: ChannelsSchema
}

export async function ChannelCards({ channels }: PropsWithoutRef<Props>) {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
      {channels.map(channel => {
        const {
          basicInfo: { id, title, thumbnails, publishedAt },
          statistics
        } = channel
        return (
          <ChannelCard
            key={id}
            id={id}
            name={title}
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
