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
import ChannelCard from 'features/youtube/components/channel/ChannelCard'
import { Channels } from 'features/youtube/types'
import { PropsWithoutRef } from 'react'

type Props = {
  channels: Channels
}

export function ChannelCards({ channels }: PropsWithoutRef<Props>) {
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
      {channels.map(channel => (
        <ChannelCard
          key={channel.id}
          name={channel.title}
          description={channel.description}
          src={channel.thumbnails['medium'].url}
          publishedAt={channel.publishedAt}
        />
      ))}
    </section>
  )
}
