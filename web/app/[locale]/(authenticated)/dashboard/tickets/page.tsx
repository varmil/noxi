import { Lightbulb, Tickets } from 'lucide-react'
import { Metadata } from 'next'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
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
import DashboardTicketsPreview from 'features/dashboard/ticket/Preview'
import CheerTicketUsages from 'features/user-public-profile/components/CheerTicketUsages'
import { auth } from 'lib/auth'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '応援チケット - マイページ - VCharts'
  }
}

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

  return (
    <div className="space-y-6">
      <Card className="w-full">
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
            <Badge variant="outline" className="">
              ログインで獲得
            </Badge>
          </div>

          <div>
            <h3 className="text-base font-medium mb-1">最近の使用履歴</h3>
            <p className="text-xs text-muted-foreground mb-4">
              反映に５分程度かかることがあります
            </p>
            {usages.length === 0 ? (
              <Alert>
                <Lightbulb className="size-5" />
                <AlertTitle>まだ応援したことがありません</AlertTitle>
                <AlertDescription>
                  推しのページに行って「応援チケットを使う」ボタンから応援を行うことができます。応援すればするほど、あなたも推しもランキングに載りやすくなります。
                </AlertDescription>
              </Alert>
            ) : null}
            <CheerTicketUsages usages={usages} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
