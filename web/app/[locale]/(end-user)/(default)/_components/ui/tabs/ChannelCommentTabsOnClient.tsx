'use client'

import { useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

type Props = {
  superChat: JSX.Element
  comments: JSX.Element
}

type TabValue = 'superChat' | 'comments'

export function ChannelCommentTabsOnClient({ superChat, comments }: Props) {
  const [tabValue, setTabValue] = useState<TabValue>('superChat')

  return (
    <Tabs
      defaultValue={'superChat'}
      className="w-full"
      onValueChange={(value: string) => setTabValue(value as TabValue)}
    >
      <TabsList className="w-full mb-4">
        <TabsTrigger className="flex-1" value="superChat">
          Super Chat
        </TabsTrigger>
        <TabsTrigger className="flex-1" value="comments">
          Comments
        </TabsTrigger>
      </TabsList>

      <ScrollArea className="h-[493px] rounded-md border p-4">
        <TabsContent
          forceMount
          value="superChat"
          hidden={tabValue !== 'superChat'}
        >
          {superChat}
        </TabsContent>
        <TabsContent
          forceMount
          value="comments"
          hidden={tabValue !== 'comments'}
        >
          {comments}
        </TabsContent>
      </ScrollArea>
    </Tabs>
  )
}
