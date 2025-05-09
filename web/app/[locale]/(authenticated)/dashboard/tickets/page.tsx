import { CalendarIcon, Send, Tickets } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

// 応援チケット使用履歴のモックデータ
const ticketHistory = [
  {
    id: 1,
    vtuber: {
      name: '花野すみれ',
      avatar: '/placeholder.svg?height=40&width=40'
    },
    amount: 5,
    date: '2025-05-04T15:30:00'
  },
  {
    id: 2,
    vtuber: {
      name: 'Nakiri Ayame Ch.',
      avatar: '/placeholder.svg?height=40&width=40'
    },
    amount: 1,
    date: '2025-05-03T12:45:00'
  },
  {
    id: 3,
    vtuber: {
      name: 'Mio Channel',
      avatar: '/placeholder.svg?height=40&width=40'
    },
    amount: 3,
    date: '2025-05-02T18:20:00'
  },
  {
    id: 4,
    vtuber: {
      name: 'ねくろちゃん',
      avatar: '/placeholder.svg?height=40&width=40'
    },
    amount: 1,
    date: '2025-05-01T09:15:00'
  },
  {
    id: 5,
    vtuber: {
      name: 'Koyori ch.',
      avatar: '/placeholder.svg?height=40&width=40'
    },
    amount: 10,
    date: '2025-04-30T21:00:00'
  }
]

export default function TicketsPage() {
  // 残りのチケット数
  const remainingTickets = 23

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>応援チケット</CardTitle>
          <CardDescription>
            応援チケットの残数と使用履歴を確認できます。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg mb-6">
            <div className="flex items-center">
              <Tickets className="h-8 w-8 text-primary mr-4" />
              <div>
                <p className="text-sm font-medium">残りチケット</p>
                <p className="text-2xl font-bold">{remainingTickets}枚</p>
              </div>
            </div>
            <Badge variant="outline" className="text-xs">
              毎日1枚付与
            </Badge>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">最近の使用履歴</h3>
            <div className="space-y-4">
              {ticketHistory.map(item => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b pb-3"
                >
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage
                        src={item.vtuber.avatar || '/placeholder.svg'}
                        alt={item.vtuber.name}
                      />
                      <AvatarFallback>
                        {item.vtuber.name.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{item.vtuber.name}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <CalendarIcon className="h-3 w-3 mr-1" />
                        {new Date(item.date).toLocaleDateString('ja-JP')}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Send className="h-4 w-4 text-primary mr-1" />
                    <span className="font-medium">{item.amount}枚</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
