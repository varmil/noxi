'use client'

import { PropsWithChildren } from 'react'
import { useIsLG } from '@/hooks/use-media-query'
import { useGlobalOpenLiveChat } from '../../../_hooks/youtubeLiveStates'

/** xs:メインコンテナ, lg:左コンテナ */
export function MainContainer({ children }: PropsWithChildren) {
  return (
    <section className={`@container contents lg:block lg:flex-1`}>
      {children}
    </section>
  )
}

/** xs:チャットコンテナ, lg:hidden */
export function XSChatContainer({ children }: PropsWithChildren) {
  const { isOpenLiveChat } = useGlobalOpenLiveChat()
  const isLG = useIsLG()

  if (isLG) {
    return null
  }

  if (isOpenLiveChat) {
    return (
      // Override space-y-4 with mt-0 here
      <section className={`relative min-h-80 h-[calc(100vh-26rem)] mt-0!`}>
        {children}
      </section>
    )
  } else {
    return null
  }
}

/** xs:hidden, lg:チャットコンテナ */
export function LgChatContainer({ children }: PropsWithChildren) {
  const { isOpenLiveChat } = useGlobalOpenLiveChat()
  const isLG = useIsLG()

  if (!isLG) {
    return null
  }

  if (isOpenLiveChat) {
    return (
      <section className="relative w-[400px] h-screen px-0">
        {/* top-14: Header の高さ (h-14) 分のオフセット */}
        <div className="fixed w-[400px] top-14 bottom-0">{children}</div>
      </section>
    )
  } else {
    return null
  }
}
