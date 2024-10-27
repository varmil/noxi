import { PropsWithChildren } from 'react'

export function CommentGalleryContainer({ children }: PropsWithChildren) {
  return <section className="px-2">{children}</section>
}
