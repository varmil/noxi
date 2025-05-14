import { CalendarIcon, Lightbulb, Send, Tickets } from 'lucide-react'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { getCheerTicketUsages } from 'apis/cheer-ticket-usages/getCheerTicketUsages'
import { getCheerTicket } from 'apis/cheer-tickets/getCheerTicket'
import { getChannels } from 'apis/youtube/getChannels'
import DashboardTicketsPreview from 'features/dashboard/ticket/Preview'
import { auth } from 'lib/auth'

export default async function TicketsPage() {
  const session = await auth()
  if (!session) {
    return <DashboardTicketsPreview />
  }

  const [cheerTicket, usages] = await Promise.all([
    getCheerTicket(),
    getCheerTicketUsages({
      userId: session.user.id,
      orderBy: [
        {
          field: 'usedAt',
          order: 'desc'
        }
      ],
      limit: 30
    })
  ])
  const [channels] = await Promise.all([
    getChannels({
      ids: usages.map(usage => usage.channelId),
      limit: usages.length
    })
  ])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>応援チケット</CardTitle>
          <CardDescription>
            応援チケットの残数と使用履歴を確認できます
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg mb-6">
            <div className="flex items-center">
              <Tickets className="h-8 w-8 text-primary mr-4" />
              <div>
                <p className="text-sm font-medium">保有チケット</p>
                <p className="text-2xl font-bold">
                  {cheerTicket?.totalCount ?? 0}枚
                </p>
              </div>
            </div>
            <Badge variant="outline" className="text-xs">
              ログインで獲得
            </Badge>
          </div>

          <div>
            <h3 className="text-base font-medium mb-1">最近の使用履歴</h3>
            <p className="text-xs text-muted-foreground mb-4">
              反映に５分程度かかることがあります
            </p>
            <div className="space-y-4">
              {usages.length === 0 ? (
                <Alert>
                  <Lightbulb className="size-5" />
                  <AlertTitle>まだ応援したことがありません</AlertTitle>
                  <AlertDescription>
                    推しのページに行って「応援チケットを使う」ボタンから応援を行うことができます。応援すればするほど、あなたも推しもランキングに載りやすくなります。
                  </AlertDescription>
                </Alert>
              ) : null}
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
                    <div className="flex-1 flex items-center">
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
                    </div>
                    <div className="flex items-center">
                      <Send className="h-4 w-4 text-primary mr-1" />
                      <span className="font-medium">{item.usedCount}枚</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
