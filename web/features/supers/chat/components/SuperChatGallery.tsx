import { PropsWithoutRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { getSuperChats } from 'apis/youtube/getSuperChats'
import { SuperChat } from 'features/supers/chat/components/SuperChat'

type Props = {
  videoId?: string
}

export async function SuperChatGallery({ videoId }: PropsWithoutRef<Props>) {
  const [chats] = await Promise.all([
    getSuperChats({
      videoId,
      orderBy: [{ field: 'tier', order: 'desc' }],
      limit: 1000
    })
  ])

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4">スーパーチャット</h2>
        {chats.map((chat, i) => (
          <SuperChat key={i} chat={chat} />
        ))}
      </CardContent>
    </Card>
  )
}

type SuperChatItem = {
  id: string
  user: {
    name: string
    avatar: string
  }
  amount: number
  currency: string
  message: string
  timestamp: string
  type: 'superchat' | 'supersticker'
}

const superChatData: SuperChatItem[] = [
  {
    id: '1',
    user: { name: '田中太郎', avatar: '/placeholder.svg?height=40&width=40' },
    amount: 1000,
    currency: '¥',
    message: 'がんばってください！',
    timestamp: '2023-10-15 14:30',
    type: 'superchat'
  },
  {
    id: '2',
    user: { name: '佐藤花子', avatar: '/placeholder.svg?height=40&width=40' },
    amount: 5000,
    currency: '¥',
    message: '素晴らしい配信をありがとう！',
    timestamp: '2023-10-15 14:35',
    type: 'superchat'
  },
  {
    id: '3',
    user: { name: '鈴木一郎', avatar: '/placeholder.svg?height=40&width=40' },
    amount: 500,
    currency: '¥',
    message: 'ステッカーを送ります！',
    timestamp: '2023-10-15 14:40',
    type: 'supersticker'
  }
  // 他のスーパーチャットやスーパーステッカーのデータをここに追加
]
