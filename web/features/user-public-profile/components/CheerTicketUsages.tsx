import { CalendarIcon, Send } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CheerTicketUsagesSchema } from 'apis/cheer-ticket-usages/cheerTicketUsageSchema'
import { getChannels } from 'apis/youtube/getChannels'
import { Link } from 'lib/navigation'

interface Props {
  usages: CheerTicketUsagesSchema
}

/** User --> Channel に対するチケットの使用履歴 */
export default async function CheerTicketUsages({ usages }: Props) {
  const [channels] = await Promise.all([
    getChannels({
      ids: usages.map(usage => usage.channelId),
      limit: usages.length
    })
  ])
  return (
    <div className="space-y-4">
      {usages.map(item => {
        const channel = channels.find(
          channel => channel.basicInfo.id === item.channelId
        )
        if (!channel) {
          return null
        }
        return (
          <div
            key={item.usedAt.toISOString()}
            className="flex items-center justify-between gap-x-4 border-b pb-3"
          >
            <Link
              href={`/${channel.peakX.group}/channels/${channel.basicInfo.id}`}
              className="flex-1 flex items-center"
            >
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage
                  src={
                    channel.basicInfo.thumbnails.medium?.url ||
                    '/placeholder.svg'
                  }
                  alt={channel.basicInfo.title}
                />
                <AvatarFallback>
                  {channel.basicInfo.title.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium line-clamp-1 break-all">
                  {channel.basicInfo.title}
                </p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <CalendarIcon className="h-3 w-3 mr-1" />
                  {new Date(item.usedAt).toLocaleDateString('ja-JP')}
                </div>
              </div>
            </Link>
            <div className="flex items-center">
              <Send className="h-4 w-4 text-primary mr-1" />
              <span className="font-medium">{item.usedCount}枚</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
