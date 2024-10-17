import { PropsWithoutRef } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { getSuperChats } from 'apis/youtube/getSuperChats'
import SuperChat from 'features/supers/chat/components/SuperChat'

type Props = {
  videoId?: string
}

export default async function SuperChatGallery({
  videoId
}: PropsWithoutRef<Props>) {
  const [chats] = await Promise.all([
    getSuperChats({
      videoId,
      orderBy: [{ field: 'tier', order: 'desc' }],
      limit: 1000
    })
  ])

  return (
    <section className="px-4">
      <section className="mb-6">
        <h3 className="text-lg font-bold">
          {chats.length.toLocaleString()} 件のスーパーチャット（金額の大きい順）
        </h3>
      </section>
      <section>
        <div className="grid grid-col-1 gap-y-8">
          {chats.map((chat, i) => (
            <SuperChat key={i} chat={chat} />
          ))}
        </div>
      </section>
    </section>
  )
}
