import { PropsWithChildren } from 'react'

export function CommentFooter({ children }: PropsWithChildren<{}>) {
  return <div className="mt-1">{children}</div>
}
