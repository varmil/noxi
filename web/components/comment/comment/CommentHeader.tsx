import { PropsWithChildren } from 'react'

export function CommentHeader({ children }: PropsWithChildren) {
  return (
    <div className="flex items-center gap-x-3 justify-between mb-2">
      {children}
    </div>
  )
}

export function CommentHeaderItem({
  className,
  children
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={`flex items-center ${className ?? ''}`}>{children}</div>
  )
}

export const CommentHeaderWeakLine = ({
  className,
  ellipsis,
  children
}: PropsWithChildren<{ className?: string; ellipsis?: boolean }>) => (
  <p
    className={`text-xs sm:text-sm text-muted-foreground ${className ?? ''} ${
      ellipsis ? 'flex-1 line-clamp-1' : ''
    }`}
  >
    {children}
  </p>
)
