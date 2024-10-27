import { PropsWithChildren } from 'react'

export function CommentHeader({ children }: PropsWithChildren) {
  return (
    <div className="flex items-center justify-between mb-2">{children}</div>
  )
}

export function CommentHeaderItem({
  className,
  children
}: PropsWithChildren<{ className?: string }>) {
  return <div className={` ${className ?? ''}`}>{children}</div>
}

export const CommentHeaderWeakLine = ({ children }: PropsWithChildren) => (
  <p className="text-xs sm:text-sm text-muted-foreground">{children}</p>
)
