'use client'

import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { HyperChatSchema } from 'apis/hyper-chats/hyperChatSchema'
import { HyperChatCard } from 'components/hyper-chat/HyperChatCard'
import { HyperChatRotator } from 'components/hyper-chat/HyperChatRotator'
import { Link } from 'lib/navigation'

interface Props {
  hyperChats: HyperChatSchema[]
  channelId: string
  group: string
  className?: string
}

export function HyperChatTimelineSheet({
  hyperChats,
  channelId,
  group,
  className
}: Props) {
  const t = useTranslations('Features.hyperChat.timeline')
  const [open, setOpen] = useState(false)

  if (hyperChats.length === 0) {
    return null
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <div className={cn('cursor-pointer', className)}>
          <HyperChatRotator
            hyperChats={hyperChats}
            onBubbleClick={() => setOpen(true)}
          />
        </div>
      </SheetTrigger>
      <SheetContent side="right" className="w-[320px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            {t('title')}
          </SheetTitle>
          <SheetDescription hidden>{t('title')}</SheetDescription>
        </SheetHeader>

        <div className="mt-4 flex flex-col gap-3 overflow-y-auto pr-2">
          {hyperChats.slice(0, 10).map(hyperChat => (
            <HyperChatCard key={hyperChat.id} hyperChat={hyperChat} />
          ))}
        </div>

        {hyperChats.length > 10 && (
          <div className="mt-4">
            <Button variant="outline" className="w-full" asChild>
              <Link href={`/${group}/channels/${channelId}/hyper-chat`}>
                {t('viewAll')}
              </Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
