import { PropsWithChildren } from 'react'

export default async function CommentContent({ children }: PropsWithChildren) {
  return <p className="break-anywhere">{children}</p>
}
