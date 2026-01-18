import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { ChannelsRanking } from 'features/channels-ranking/types/channels-ranking.type'
import { Link } from 'lib/navigation'

type Props = {
  title: string
  subtitle?: string
  href: string
  channels: ChannelsRanking[]
}

export default function PeriodCard({ title, subtitle, href, channels }: Props) {
  return (
    <Link href={href} prefetch={false}>
      <Card className="group cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-primary/50">
        <CardContent className="p-4">
          <div className="mb-3">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            )}
          </div>
          <div className="flex items-center -space-x-2">
            {channels.slice(0, 5).map((channel, index) => (
              <Avatar
                key={channel.channelId}
                className="size-9 ring-2 ring-background transition-transform group-hover:scale-105"
                style={{ zIndex: 5 - index }}
              >
                <AvatarImage
                  src={channel.channelThumbnails}
                  alt={channel.channelTitle}
                />
                <AvatarFallback className="text-xs">
                  {channel.channelTitle.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
            ))}
            {channels.length === 0 && (
              <span className="text-xs text-muted-foreground">
                No data available
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
