'use client'

import { useState } from 'react'
import { MessagesSquare } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
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
      <SheetContent
        side="right"
        className="w-[320px] sm:w-[400px] gap-y-2"
        hideCloseButton
      >
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <MessagesSquare className="size-5" />
            {t('title')}
          </SheetTitle>
          <SheetDescription hidden />
        </SheetHeader>

        <ScrollArea className="flex-1 min-h-0">
          <div className="flex flex-col gap-3 px-3 pb-6">
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
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
