'use client'

import { PropsWithChildren } from 'react'
import { useGlobalOpenLiveChat } from 'app/[locale]/(end-user)/(no-layout)/youtube/live/[videoId]/_hooks/youtubeLiveStates'
import { PageXSMX } from 'components/page'

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
  if (isOpenLiveChat) {
    return (
      // Override space-y-4 with mt-0 here
      <section
        className={`relative lg:hidden min-h-80 h-[calc(100vh-26rem)] ${PageXSMX} mt-0!`}
      >
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
  if (isOpenLiveChat) {
    return (
      <section className="hidden lg:block lg:relative lg:w-[400px] lg:h-screen lg:px-0">
        <div className="lg:fixed lg:w-[400px] lg:h-full lg:top-0 lg:bottom-0">
          {children}
        </div>
      </section>
    )
  } else {
    return null
  }
}
