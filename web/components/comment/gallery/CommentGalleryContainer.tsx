import { PropsWithChildren } from 'react'

export default async function CommentGalleryContainer({
  children
}: PropsWithChildren) {
  return <section className="px-2">{children}</section>
}
