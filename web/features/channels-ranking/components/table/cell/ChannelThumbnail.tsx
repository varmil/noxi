import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ChannelSchema } from 'apis/youtube/schema/channelSchema'

export default function ChannelThumbnail({
  className,
  channel
}: {
  className?: string
  channel: ChannelSchema
}) {
  return (
    <Avatar
      className={`w-7 h-7 @lg:w-12 @lg:h-12 transition-all hover:scale-105 ${
        className || ''
      }`}
    >
      <AvatarImage
        src={channel.basicInfo.thumbnails.medium?.url}
        alt={channel.basicInfo.title}
      />
      <AvatarFallback>{channel.basicInfo.title}</AvatarFallback>
    </Avatar>
  )
}
