import { PropsWithChildren } from 'react'

export function CommentFooter({ children }: PropsWithChildren<{}>) {
  return (
    <div className="flex items-center text-muted-foreground mt-1">
      {children}
    </div>
  )
}
