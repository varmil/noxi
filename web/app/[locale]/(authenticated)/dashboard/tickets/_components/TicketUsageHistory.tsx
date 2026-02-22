import { ArrowRight, Box, Calendar, History } from 'lucide-react'
import { getFormatter, getTranslations } from 'next-intl/server'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getMyHyperChats } from 'apis/hyper-chats/getMyHyperChats'
import { getChannels } from 'apis/youtube/getChannels'
import { Link } from 'lib/navigation'

export default async function TicketUsageHistory() {
  const [t, format] = await Promise.all([
    getTranslations('Page.dashboard.tickets'),
    getFormatter()
  ])

  const hyperChats = await getMyHyperChats({ tier: 'free', limit: 30 })

  // チャンネル情報を一括取得
  const channelIds = [...new Set(hyperChats.map(hc => hc.channelId))]
  const channels =
    channelIds.length > 0 ? await getChannels({ ids: channelIds }) : []
  const channelMap = new Map(channels.map(ch => [ch.basicInfo.id, ch]))

  const hasHistory = hyperChats.length > 0

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="size-5" />
          {t('usageHistory')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {hasHistory ? (
          <div className="space-y-6">
            {hyperChats.map(item => {
              const channel = channelMap.get(item.channelId)
              const thumbnailUrl =
                channel?.basicInfo.thumbnails.default?.url ?? undefined
              const channelName = channel?.basicInfo.title ?? item.channelId

              const group = channel?.peakX.group ?? item.group
              const href =
                `/${group}/channels/${item.channelId}/hyper-chat` as const

              return (
                <Link
                  key={item.id}
                  href={href}
                  prefetch={false}
                  className="flex items-center gap-4 rounded-lg transition-colors hover:bg-muted/50"
                >
                  <Avatar className="size-10">
                    <AvatarImage src={thumbnailUrl} alt={channelName} />
                    <AvatarFallback>{channelName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold line-clamp-1 break-all">
                      {channelName}
                    </p>
                    <p className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="size-3" />
                      {t('usedOn', {
                        date: format.dateTime(item.createdAt, {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit'
                        })
                      })}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-muted p-4">
              <Box className="size-8 text-muted-foreground" />
            </div>
            <p className="mt-4 text-muted-foreground">{t('noUsageHistory')}</p>
            <Button asChild variant="outline" size="sm" className="mt-4">
              <Link href="/groups">
                {t('findTalent')}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
