import { PropsWithChildren } from 'react'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { ChannelSchema } from 'apis/youtube/schema/channelSchema'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import { Link } from 'lib/navigation'

/**
 * @note 関連動画を見せるUIとしてコメントアウト部分は使えそう
 */
export const StreamContainer = ({ children }: PropsWithChildren) => (
  // <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">{children}</div>
  <div className="flex flex-col gap-2">{children}</div>
)

export const StreamContentContainer = ({ children }: PropsWithChildren) => (
  <div className="flex-1 grid grid-cols-[auto,1fr,auto] gap-x-3 gap-y-1">
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
      <Link
        href={`/${stream.group}/channels/${channel.basicInfo.id}`}
        prefetch={true}
      >
        <Avatar className="w-9 h-9 sm:w-11 sm:h-11 transition-all hover:scale-105">
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
      <h3 className="break-anywhere text-sm line-clamp-2 mb-1">{title}</h3>
      <div className="col-start-2 flex items-center gap-1">
        <div className="text-xs sm:text-sm text-muted-foreground">
          <Link href={`/${group}/channels/${channelId}`} prefetch={true}>
            <div className="hover:text-accent-foreground">
              {channel.basicInfo.title}
            </div>
          </Link>
          {children}
        </div>
      </div>
    </div>
  )
}
