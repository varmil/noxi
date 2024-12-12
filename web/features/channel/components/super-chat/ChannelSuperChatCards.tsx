import { PropsWithChildren } from 'react'

/**
 * SupersSummaryをまとめて表示するコンポーネント
 */
export default async function ChannelSuperChatCards({
  channelId,
  className,
  children
}: PropsWithChildren<{ channelId: string; className?: string }>) {
  return <>{children}</>
}
