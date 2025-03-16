import { PropsWithoutRef } from 'react'
import { ThumbsUp } from 'lucide-react'

export function CommentLikes({ likes }: PropsWithoutRef<{ likes: number }>) {
  return (
    <div className="flex items-center text-muted-foreground">
      <ThumbsUp className="size-4 mr-1" />
      <span className="text-xs">{likes.toLocaleString()}</span>
    </div>
  )
}
