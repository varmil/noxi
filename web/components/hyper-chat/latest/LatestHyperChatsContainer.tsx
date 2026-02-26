import { Suspense } from 'react'
import { getLatestHyperChats } from 'apis/hyper-chats/getLatestHyperChats'
import { getChannels } from 'apis/youtube/getChannels'
import { LatestHyperChats } from 'components/hyper-chat/latest/LatestHyperChats'
import { LatestHyperChatsSkeleton } from 'components/hyper-chat/latest/LatestHyperChatsSkeleton'

export async function LatestHyperChatsContainer() {
  const hyperChats = await getLatestHyperChats()
  if (hyperChats.length === 0) {
    return <LatestHyperChats hyperChats={[]} channels={[]} />
  }

  const channelIds = [...new Set(hyperChats.map(hc => hc.channelId))]
  const channels = await getChannels({
    ids: channelIds,
    limit: channelIds.length
  })

  return (
    <Suspense fallback={<LatestHyperChatsSkeleton />}>
      <LatestHyperChats hyperChats={hyperChats} channels={channels} />
    </Suspense>
  )
}
