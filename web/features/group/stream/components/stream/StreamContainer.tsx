import { PropsWithChildren } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { ChannelSchema } from 'apis/youtube/schema/channelSchema'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import { Link } from 'lib/navigation'

export const StreamContainer = ({
  videoId,
  children
}: PropsWithChildren<{ videoId: string }>) => (
  <Card className="pt-0 pb-4 gap-0 cursor-pointer hover:bg-accent/50">
    <Link
      className="contents"
      href={`/youtube/live/${videoId}`}
      prefetch={false}
    >
      {children}
    </Link>
  </Card>
)

export const StreamContent = ({ children }: PropsWithChildren) => (
  <CardContent className="pl-0 pr-4 flex gap-2">{children}</CardContent>
)

export const StreamInfo = ({ children }: PropsWithChildren) => (
  <div className="flex-1 pt-2">{children}</div>
)

export const StreamFooter = ({
  children,
  className
}: PropsWithChildren<{ className?: string }>) => (
  <CardFooter className={`flex-1 pl-2 pr-4 border-t pt-4! ${className ?? ''}`}>
    {children}
  </CardFooter>
)

export const StreamTextContainer = ({
  stream,
  channel,
  children
}: PropsWithChildren<{
  stream: StreamSchema
  channel: ChannelSchema
}>) => {
  const {
    snippet: { title }
  } = stream
  return (
    <div>
      <h3 className="text-sm tracking-tight max-w-[330px] line-clamp-2 break-anywhere mb-2">
        {title}
      </h3>
      <div className="col-start-2 flex items-center gap-1">
        <div className="text-xs text-muted-foreground">
          <span className="line-clamp-1 break-all">
            {channel.basicInfo.title}
          </span>
          {children}
        </div>
      </div>
    </div>
  )
}
