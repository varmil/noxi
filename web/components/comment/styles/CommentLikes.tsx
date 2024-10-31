import { PropsWithoutRef } from 'react'
import { ThumbsUp } from 'lucide-react'

export function CommentLikes({ likes }: PropsWithoutRef<{ likes: number }>) {
  return (
    <>
      <ThumbsUp className="w-4 h-4 mr-1" />
      <span className="text-sm">{likes.toLocaleString()}</span>
    </>
  )
}
