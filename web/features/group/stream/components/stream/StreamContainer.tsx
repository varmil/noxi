import { PropsWithChildren } from 'react'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { ChannelSchema } from 'apis/youtube/schema/channelSchema'
import { GroupString } from 'config/constants/Site'
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

export const StreamAvatar = ({
  group,
  channel,
  children
}: PropsWithChildren<{
  group: GroupString
  channel: ChannelSchema
}>) => {
  return (
    <div className="items-center text-center">
      <Link href={`/${group}/channels/${channel.basicInfo.id}`} prefetch={true}>
        <Avatar className="w-9 h-9 sm:w-11 sm:h-11 transition-all hover:scale-105">
          <AvatarImage src={channel.basicInfo.thumbnails['medium']?.url} />
        </Avatar>
      </Link>
      {children}
    </div>
  )
}
