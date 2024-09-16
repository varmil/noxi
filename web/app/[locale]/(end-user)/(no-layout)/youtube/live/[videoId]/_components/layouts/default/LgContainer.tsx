'use client'

import { useGlobalOpenLiveChat } from 'app/[locale]/(end-user)/(no-layout)/youtube/live/[videoId]/_hooks/youtubeLiveStates'

type Props = {
  className?: string
  children: React.ReactNode
}

/** LG以上のブレークポイントでシンプルな２カラムを表現するために使用する */
function LgContainer({ className, children }: Props) {
  return (
    <section className={`@container contents lg:block ${className ?? ''}`}>
      {children}
    </section>
  )
}

/** lg以上で表示する左コンテナ */
export function LeftContainer(props: Props) {
  return (
    <LgContainer
      {...props}
      className={`space-y-4 lg:flex-1 lg:grid ${props.className ?? ''}`}
    />
  )
}

/** lg以上で表示するチャットリストコンテナ */
export function RightContainer(props: Omit<Props, 'className'>) {
  const { isOpenLiveChat } = useGlobalOpenLiveChat()
  if (isOpenLiveChat) {
    return <LgContainer {...props} className="lg:w-[350px]" />
  } else {
    return <LgContainer {...props} className="hidden" />
  }
}
