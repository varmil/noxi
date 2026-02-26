'use client'

import { useIsMD } from '@/hooks/use-media-query'
import { useHyperChatFlow } from 'hooks/hyper-chat/useHyperChatFlow'
import { DesktopHyperChatDialog } from './desktop/DesktopHyperChatDialog'
import { MobileHyperChatSheet } from './mobile/MobileHyperChatSheet'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  channelId: string
  channelTitle: string
  group: string
  gender: 'male' | 'female' | 'nonbinary'
}

export function HyperChatDialog({
  channelTitle,
  ...dialogArgs
}: Props) {
  const isDesktop = useIsMD()
  const dialog = useHyperChatFlow(dialogArgs)

  if (isDesktop) {
    return (
      <DesktopHyperChatDialog dialog={dialog} channelTitle={channelTitle} />
    )
  }

  return <MobileHyperChatSheet dialog={dialog} channelTitle={channelTitle} />
}
