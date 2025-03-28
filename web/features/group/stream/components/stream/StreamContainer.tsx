import { PropsWithChildren } from 'react'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { ChannelSchema } from 'apis/youtube/schema/channelSchema'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import { Link } from 'lib/navigation'

export const StreamContainer = ({ children }: PropsWithChildren) => (
  <div className="flex flex-col gap-2">{children}</div>
)

export const StreamContentContainer = ({ children }: PropsWithChildren) => (
  <div className="flex-1 grid grid-cols-[auto_1fr_auto] gap-x-3 gap-y-1">
    {children}
  </div>
)

export const StreamAvatarContainer = ({
  stream,
  channel,
  children
}: PropsWithChildren<{
  stream: StreamSchema
  channel: ChannelSchema
}>) => {
  return (
    <div className="items-center text-center">
      <Link href={`/${stream.group}/channels/${channel.basicInfo.id}`}>
        <Avatar className="w-9 h-9 transition-all hover:scale-105">
          <AvatarImage
            alt={channel.basicInfo.title}
            src={channel.basicInfo.thumbnails['medium']?.url}
          />
        </Avatar>
      </Link>
      {children}
    </div>
  )
}

export const StreamTextContainer = ({
  stream,
  channel,
  children
}: PropsWithChildren<{
  stream: StreamSchema
  channel: ChannelSchema
}>) => {
  const {
    snippet: { title, channelId },
    group
  } = stream
  return (
    <div>
      <h3 className="text-sm tracking-tight line-clamp-2 break-anywhere mb-1">
        {title}
      </h3>
      <div className="col-start-2 flex items-center gap-1">
        <div className="text-xs text-muted-foreground">
          <Link
            href={`/${group}/channels/${channelId}`}
            className="line-clamp-1 break-all hover:text-accent-foreground"
          >
            {channel.basicInfo.title}
          </Link>
          {children}
        </div>
      </div>
    </div>
  )
}
