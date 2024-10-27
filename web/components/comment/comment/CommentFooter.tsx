import { PropsWithoutRef } from 'react'
import { ThumbsUp } from 'lucide-react'

export function CommentFooter({ likes }: PropsWithoutRef<{ likes: number }>) {
  return (
    <div className="flex items-center text-sm gap-x-4 mt-1">
      <div className="flex items-center text-muted-foreground">
        <ThumbsUp className="w-4 h-4 mr-1" />
        {likes.toLocaleString()}
      </div>
    </div>
  )
}
