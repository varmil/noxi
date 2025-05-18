import { CalendarIcon, Heart } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

interface CommentHistoryProps {
  username: string
}

export async function CommentHistory({ username }: CommentHistoryProps) {
  // モックデータ（実際の実装ではデータベースから取得）
  const commentHistory = [
    {
      id: 1,
      vtuber: {
        name: '花野すみれ',
        avatar: '/placeholder.svg?height=40&width=40'
      },
      comment: '配信お疲れ様でした！歌枠とても楽しかったです！',
      likes: 12,
      date: '2025-05-04T20:15:00'
    },
    {
      id: 2,
      vtuber: {
        name: 'Nakiri Ayame Ch.',
        avatar: '/placeholder.svg?height=40&width=40'
      },
      comment: '新衣装とても可愛いです！次の配信も楽しみにしています！',
      likes: 8,
      date: '2025-05-02T18:30:00'
    },
    {
      id: 3,
      vtuber: {
        name: 'Mio Channel',
        avatar: '/placeholder.svg?height=40&width=40'
      },
      comment: 'ゲーム実況面白かったです！またやってほしいです！',
      likes: 5,
      date: '2025-04-30T21:45:00'
    },
    {
      id: 4,
      vtuber: {
        name: 'ねくろちゃん',
        avatar: '/placeholder.svg?height=40&width=40'
      },
      comment: '誕生日おめでとう！これからも応援しています！',
      likes: 24,
      date: '2025-04-28T12:00:00'
    },
    {
      id: 5,
      vtuber: {
        name: 'Koyori ch.',
        avatar: '/placeholder.svg?height=40&width=40'
      },
      comment: 'コラボ配信楽しかったです！またぜひやってください！',
      likes: 15,
      date: '2025-04-25T19:20:00'
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>最近のコメント履歴</CardTitle>
        <CardDescription>
          {username}さんが最近VTuberに送ったコメント
        </CardDescription>
      </CardHeader>
      <CardContent>
        {commentHistory.length === 0 ? (
          <p className="text-center py-8 text-muted-foreground">
            コメント履歴はありません
          </p>
        ) : (
          <div className="space-y-6">
            {commentHistory.map(item => (
              <div key={item.id} className="border-b pb-4 last:border-0">
                <div className="flex items-center mb-3">
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
                <div className="pl-12 space-y-2">
                  <p className="text-sm">{item.comment}</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Heart className="h-3 w-3 mr-1 text-red-500" />
                    <span>{item.likes}いいね</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
