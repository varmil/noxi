import { PropsWithChildren } from 'react'

/** 全体 */
export function CommentContainer({ children }: PropsWithChildren) {
  return <div className={`flex gap-x-3`}>{children}</div>
}

/** Avatar以外 */
export function CommentMain({ children }: PropsWithChildren) {
  return <div className={`flex-1`}>{children}</div>
}
