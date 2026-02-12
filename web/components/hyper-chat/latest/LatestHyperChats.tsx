import { MessagesSquare } from 'lucide-react'
import { useFormatter, useTranslations } from 'next-intl'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { HyperChatsSchema } from 'apis/hyper-chats/hyperChatSchema'
import { ChannelsSchema } from 'apis/youtube/schema/channelSchema'
import Image from 'components/styles/Image'
import { Link } from 'lib/navigation'

type Props = {
  hyperChats: HyperChatsSchema
  channels: ChannelsSchema
}

export function LatestHyperChats({ hyperChats, channels }: Props) {
  const t = useTranslations('Features.hyperChat.latestActivity')
  const format = useFormatter()

  return (
    <section className="z-0 w-full max-w-[1185px] pt-12 pb-2 px-4 sm:px-6 mx-auto">
      <div className="mx-auto ">
        <div className="mb-4 flex items-center gap-2 sm:mb-6">
          <MessagesSquare className="size-5 text-muted-foreground" />
          <h2 className="text-base font-bold">{t('title')}</h2>
        </div>

        {hyperChats.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center sm:py-12">
            <MessagesSquare className="mb-3 size-10 text-muted-foreground/40 sm:size-12" />
            <p className="max-w-md text-sm text-muted-foreground">
              {t('empty')}
            </p>
          </div>
        ) : (
          <ScrollArea className="w-full">
            <div className="flex gap-3 sm:gap-4 min-w-min pb-4">
              {hyperChats.map(hc => {
                const channel = channels.find(
                  c => c.basicInfo.id === hc.channelId
                )
                if (!channel) return null

                const thumbnail =
                  channel.basicInfo.thumbnails.medium?.url ??
                  channel.basicInfo.thumbnails.default?.url ??
                  ''

                return (
                  <Link
                    key={hc.id}
                    href={`/${hc.group}/channels/${hc.channelId}/hyper-chat`}
                    className="group flex flex-col items-center w-24 shrink-0"
                    prefetch={false}
                  >
                    <div className="mb-2 overflow-hidden rounded-lg">
                      <Image
                        src={thumbnail}
                        alt={channel.basicInfo.title}
                        width={92}
                        height={92}
                        className="size-23 object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <span className="w-full text-center text-xs font-medium line-clamp-1 break-all">
                      {channel.basicInfo.title}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      {format.relativeTime(hc.createdAt)}
                    </span>
                  </Link>
                )
              })}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )}
      </div>
    </section>
  )
}
