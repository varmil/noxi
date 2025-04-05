import { PropsWithChildren } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { ChannelSchema } from 'apis/youtube/schema/channelSchema'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import { Link } from 'lib/navigation'

export const StreamContainer = ({ children }: PropsWithChildren) => (
  <Card className="gap-4">{children}</Card>
)

export const StreamContent = ({ children }: PropsWithChildren) => (
  <CardContent className="flex gap-2">{children}</CardContent>
)

export const StreamInfo = ({ children }: PropsWithChildren) => (
  <div className="flex-1 grid grid-cols-[auto_1fr_auto]">{children}</div>
)

export const StreamFooter = ({
  children,
  className
}: PropsWithChildren<{ className?: string }>) => (
  <CardFooter className={`border-t pt-4! ${className ?? ''}`}>
    {children}
  </CardFooter>
)

// export const StreamAvatarContainer = ({
//   stream,
//   channel,
//   children
// }: PropsWithChildren<{
//   stream: StreamSchema
//   channel: ChannelSchema
// }>) => {
//   return (
//     <div className="items-center text-center">
//       <Link href={`/${stream.group}/channels/${channel.basicInfo.id}`}>
//         <Avatar className="w-9 h-9 transition-all hover:scale-105">
//           <AvatarImage
//             alt={channel.basicInfo.title}
//             src={channel.basicInfo.thumbnails['medium']?.url}
//           />
//         </Avatar>
//       </Link>
//       {children}
//     </div>
//   )
// }

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
      <h3 className="text-sm tracking-tight max-w-[330px] line-clamp-2 break-anywhere mb-1">
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
