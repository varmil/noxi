import { ChannelSchema } from 'apis/youtube/schema/channelSchema'

interface Props {
  channel: ChannelSchema
  className?: string
}

export default function ChannelTitle({ channel, className }: Props) {
  return (
    <div className={`group ${className || ''}`}>
      <span className="line-clamp-1 break-all group-hover:underline">
        {channel.basicInfo.title}
      </span>
    </div>
  )
}
