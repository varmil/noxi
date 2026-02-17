'use client'

import { useTranslations } from 'next-intl'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { HyperChatSchema } from 'apis/hyper-chats/hyperChatSchema'
import { ChannelSchema } from 'apis/youtube/schema/channelSchema'
import { HyperChatCard } from 'components/hyper-chat/timeline/HyperChatCard'
import { Link } from 'lib/navigation'

interface Props {
  hyperChat: HyperChatSchema
  isLiked?: boolean
  channel?: ChannelSchema
}

export function ScrambleHyperChatCard({ hyperChat, isLiked, channel }: Props) {
  const t = useTranslations('Features.hyperChat')

  return (
    <div>
      <HyperChatCard hyperChat={hyperChat} isLiked={isLiked} />

      {channel && (
        <Link
          href={`/${channel.peakX.group}/channels/${channel.basicInfo.id}/hyper-chat`}
          prefetch={false}
          className="flex items-center justify-end gap-1 text-xs sm:text-sm text-muted-foreground mt-1 hover:underline"
        >
          <span>{t('toChannel')}</span>
          <Avatar className="size-6">
            <AvatarImage
              src={channel.basicInfo.thumbnails.default?.url}
              alt={channel.basicInfo.title}
            />
            <AvatarFallback>{channel.basicInfo.title.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="line-clamp-1 break-all">
            {channel.basicInfo.title}
          </span>
        </Link>
      )}
    </div>
  )
}
