'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

type Props = {
  superChat: JSX.Element
  comments: JSX.Element
}

export function ChannelCommentTabsOnClient({ superChat, comments }: Props) {
  return (
    <Tabs defaultValue={'superChat'} className="w-full">
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
          className={'data-[state=inactive]:content-visibility-hidden'}
        >
          {superChat}
        </TabsContent>
        <TabsContent
          forceMount
          value="comments"
          className={'data-[state=inactive]:content-visibility-hidden'}
        >
          {comments}
        </TabsContent>
      </ScrollArea>
    </Tabs>
  )
}
