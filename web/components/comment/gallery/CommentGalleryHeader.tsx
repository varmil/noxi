import { PropsWithChildren } from 'react'

export default async function CommentGalleryHeader({
  children
}: PropsWithChildren) {
  return (
    <section className="mb-6">
      <h3 className="text-lg font-bold">{children}</h3>
    </section>
  )
}
