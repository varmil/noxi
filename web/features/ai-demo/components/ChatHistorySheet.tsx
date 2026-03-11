'use client'

import { Menu, Search } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { MOCK_HISTORY_ITEMS } from '../constants/mockHistory'

export default function ChatHistorySheet() {
  const t = useTranslations('Features.aiDemo.chatHistory')

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="shrink-0">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-72 p-0"
        onOpenAutoFocus={e => e.preventDefault()}
        onCloseAutoFocus={e => e.preventDefault()}
      >
        <SheetHeader className="border-b p-4">
          <SheetTitle className="text-sm">{t('title')}</SheetTitle>
          <SheetDescription />
        </SheetHeader>
        <div className="px-3 pt-3 pb-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-3 size-4 text-muted-foreground" />
            <Input
              placeholder={t('search')}
              className="pl-8 py-5 rounded-2xl"
              readOnly
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          <p className="px-3 py-2 text-xs font-medium text-muted-foreground">
            {t('chats')}
          </p>
          <div className="flex flex-col gap-y-2">
            {MOCK_HISTORY_ITEMS.map(item => (
              <button
                key={item.id}
                className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-muted transition-colors"
              >
                {t(item.titleKey)}
              </button>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
