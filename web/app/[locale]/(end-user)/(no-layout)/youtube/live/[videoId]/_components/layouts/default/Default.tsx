'use client'

import { useGlobalOpenLiveChat } from 'app/[locale]/(end-user)/(no-layout)/youtube/live/[videoId]/_hooks/youtubeLiveStates'
import { PageXSMX } from 'components/page'

type Props = {
  className?: string
  children: React.ReactNode
}

/** xs:contents, lg:block */
function LgContainer({ className, children }: Props) {
  return (
    <section className={`contents lg:block ${className ?? ''}`}>
      {children}
    </section>
  )
}

/** xs:メインコンテナ, lg:左コンテナ */
export function MainContainer(props: Props) {
  return (
    <LgContainer
      {...props}
      className={`@container lg:flex-1 ${props.className ?? ''}`}
    />
  )
}

/** xs:チャットコンテナ, lg:hidden */
export function XSChatContainer({ children }: Omit<Props, 'className'>) {
  const { isOpenLiveChat } = useGlobalOpenLiveChat()
  if (isOpenLiveChat) {
    return (
      // Override space-y-4 with mt-0 here
      <section
        className={`relative lg:hidden min-h-80 h-[calc(100vh-26rem)] ${PageXSMX} !mt-0`}
      >
        {children}
      </section>
    )
  } else {
    return null
  }
}

/** xs:hidden, lg:チャットコンテナ */
export function LgChatContainer({ children }: Omit<Props, 'className'>) {
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
