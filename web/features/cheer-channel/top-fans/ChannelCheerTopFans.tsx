'use client'

import { Crown, Ticket, Tickets } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

export function ChannelCheerTopFans() {
  const feat = useTranslations('Features.cheerChannel.topFans')

  // トップファンのデータ
  const topFans = [
    {
      id: 1,
      name: 'ゆきみ',
      avatar: '/placeholder.svg?height=80&width=80',
      tickets: 120,
      rank: 1
    },
    {
      id: 2,
      name: 'そらまめ',
      avatar: '/placeholder.svg?height=80&width=80',
      tickets: 95,
      rank: 2
    },
    {
      id: 3,
      name: 'ねこまる',
      avatar: '/placeholder.svg?height=80&width=80',
      tickets: 87,
      rank: 3
    },
    {
      id: 4,
      name: 'あめつち',
      avatar: '/placeholder.svg?height=80&width=80',
      tickets: 76,
      rank: 4
    },
    {
      id: 5,
      name: 'ほしぞら',
      avatar: '/placeholder.svg?height=80&width=80',
      tickets: 65,
      rank: 5
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">
          <span className="flex items-center">
            <Crown className="mr-2 h-5 w-5 text-amber-700 dark:text-amber-500" />
            {feat('title')}
          </span>
        </CardTitle>
        <CardDescription>{feat('description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {topFans.map(fan => (
            <div
              key={fan.id}
              className={`relative flex flex-col items-center rounded-lg p-4 text-center transition-all hover:bg-muted/50 ${
                fan.rank === 1
                  ? 'bg-gradient-to-b from-amber-50 to-transparent dark:from-amber-950/30'
                  : ''
              }`}
            >
              <div className="relative mb-3">
                <Avatar className="h-16 w-16 border-2 border-background">
                  <AvatarImage
                    src={fan.avatar || '/placeholder.svg'}
                    alt={fan.name}
                  />
                  <AvatarFallback>{fan.name.substring(0, 2)}</AvatarFallback>
                </Avatar>

                {fan.rank === 1 && (
                  <div className="absolute -left-1 -top-1 rounded-full bg-amber-500 p-1 text-white">
                    <Crown className="h-3 w-3" />
                  </div>
                )}

                {fan.rank === 2 && (
                  <div className="absolute -left-1 -top-1 rounded-full bg-slate-400 p-1 text-white">
                    <Crown className="h-3 w-3" />
                  </div>
                )}

                {fan.rank === 3 && (
                  <div className="absolute -left-1 -top-1 rounded-full bg-amber-700 p-1 text-white">
                    <Crown className="h-3 w-3" />
                  </div>
                )}
              </div>

              <div className="font-medium">{fan.name}</div>

              <Badge
                variant="outline"
                className={`mt-1 ${
                  fan.rank === 1
                    ? 'border-amber-200 bg-amber-100/50 dark:border-amber-800 dark:bg-amber-950/50'
                    : ''
                }`}
              >
                <Tickets className="mr-1 size-3 text-pink-700 dark:text-pink-500" />
                {feat('tickets', { count: fan.tickets })}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
