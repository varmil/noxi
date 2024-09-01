import { PropsWithoutRef } from 'react'

const StreamListContentContainer = ({
  children,
  compact
}: PropsWithoutRef<{
  children: React.ReactNode
  compact?: boolean
}>) => {
  // 2024/09/01: 不要なのでコメントアウト。そのうち消してもいいかも
  // if (compact)
  //   return (
  //     <ScrollArea className="h-[600px] sm:h-[750px] pr-4">
  //       {children}
  //     </ScrollArea>
  //   )

  return <section>{children}</section>
}

export default StreamListContentContainer
