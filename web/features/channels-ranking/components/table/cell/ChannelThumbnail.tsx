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
      className={`size-7.5 @lg:size-9 transition-all hover:scale-105 ${
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
