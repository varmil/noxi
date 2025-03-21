import { ChannelSchema } from 'apis/youtube/schema/channelSchema'
import { GroupString } from 'config/constants/Group'

interface Props {
  channel: ChannelSchema
  group?: GroupString
  className?: string
}

export default function ChannelTitle({ channel, className }: Props) {
  // const global = useTranslations('Global')
  return (
    <div
      className={`flex flex-col gap-y-1.5 @lg:gap-y-2 items-start group ${
        className || ''
      }`}
    >
      <span className="line-clamp-1 break-all group-hover:underline">
        {channel.basicInfo.title}
      </span>
      {/* {group && (
        <span className="text-xs font-light text-muted-foreground">
          {global(`group.${group}`)}
        </span>
      )} */}
    </div>
  )
}
