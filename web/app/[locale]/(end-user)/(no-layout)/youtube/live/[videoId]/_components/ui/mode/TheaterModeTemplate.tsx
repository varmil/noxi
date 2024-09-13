'use client'

import { useState } from 'react'
import { MessageSquare, Users, Settings, Volume2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import EmbedStream from 'app/[locale]/(end-user)/(no-layout)/youtube/live/[videoId]/_components/ui/stream/EmbedStream'

type Props = {
  videoId: string
}

export default function TheaterModeTemplate({ videoId }: Props) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: 'GYAKUBANE',
      message: '100',
      avatar: '/placeholder.svg?height=32&width=32'
    },
    {
      id: 2,
      user: 'rem_107',
      message: '50',
      avatar: '/placeholder.svg?height=32&width=32'
    },
    {
      id: 3,
      user: 'Qarshsnons',
      message: '10',
      avatar: '/placeholder.svg?height=32&width=32'
    },
    {
      id: 4,
      user: 'pokkapoka2',
      message: 'チャットルームへようこそ！',
      avatar: '/placeholder.svg?height=32&width=32'
    }
  ])
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          user: 'You',
          message: newMessage.trim(),
          avatar: '/placeholder.svg?height=32&width=32'
        }
      ])
      setNewMessage('')
    }
  }

  return (
    <div className="flex h-svh bg-gray-900 text-white">
      <div className="flex-1 flex flex-col">
        <div className="flex-1 bg-black relative">
          {/* Stream */}
          <EmbedStream videoId={videoId} className="" />
          <div className="absolute bottom-4 left-4 w-48 h-36 bg-gray-800 rounded overflow-hidden">
            <img
              src="/placeholder.svg?height=180&width=240"
              alt="Webcam feed"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="h-16 bg-gray-800 flex items-center px-4 space-x-4">
          <Button variant="ghost" size="icon">
            <Settings className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <Volume2 className="h-6 w-6" />
          </Button>
          <div className="flex-1" />
          <Button variant="ghost" size="icon">
            <Users className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <MessageSquare className="h-6 w-6" />
          </Button>
        </div>
      </div>
      <div className="w-80 bg-gray-800 flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold">チャット</h2>
        </div>
        <ScrollArea className="flex-1 px-4">
          <div className="space-y-4 py-4">
            {messages.map(msg => (
              <div key={msg.id} className="flex items-start space-x-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={msg.avatar} alt={msg.user} />
                  <AvatarFallback>{msg.user[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{msg.user}</p>
                  <p className="text-sm text-gray-300">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <form
          onSubmit={handleSendMessage}
          className="p-4 border-t border-gray-700"
        >
          <div className="flex space-x-2">
            <Input
              placeholder="メッセージを送信"
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              className="flex-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
            <Button type="submit" variant="secondary">
              送信
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
