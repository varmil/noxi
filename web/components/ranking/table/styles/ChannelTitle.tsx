import { ChannelSchema } from 'apis/youtube/schema/channelSchema'

interface Props {
  channel: ChannelSchema
  className?: string
}

export default function ChannelTitle({ channel, className }: Props) {
  return (
    <div className={`flex items-center hover:underline ${className || ''}`}>
      <span className="sm:font-medium tracking-tighter @lg:tracking-normal line-clamp-1 break-all">
        {channel.basicInfo.title}
      </span>
    </div>
  )
}
