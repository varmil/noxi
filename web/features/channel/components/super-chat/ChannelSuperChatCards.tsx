import { PropsWithChildren } from 'react'
import { getSupersBundleSum } from 'apis/youtube/getSupersBundleSum'
import { getSupersSummary } from 'apis/youtube/getSupersSummary'

/**
 * SupersSummaryをまとめて表示するコンポーネント
 */
export default async function ChannelSuperChatCards({
  channelId,
  className,
  children
}: PropsWithChildren<{ channelId: string; className?: string }>) {
  const summary = await getSupersSummary(channelId)
  const sum = await getSupersBundleSum({ channelId })
  console.log('sum', sum)

  return <>{children}</>
}
