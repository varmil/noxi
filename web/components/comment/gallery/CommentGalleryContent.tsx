import { PropsWithChildren } from 'react'

export default async function CommentGalleryContent({
  children
}: PropsWithChildren) {
  return (
    <section>
      <div className="grid grid-col-1 gap-y-8">{children}</div>
    </section>
  )
}
