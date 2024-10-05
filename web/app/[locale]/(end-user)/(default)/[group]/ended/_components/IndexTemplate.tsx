import { PropsWithoutRef } from 'react'
import EndedStreamGallery from 'features/group/ended/components/EndedStreamGallery'

type Props = {}

export async function IndexTemplate({}: PropsWithoutRef<Props>) {
  return (
    <>
      <div className="grid grid-cols-4 gap-2 sm:gap-2">
        <section className="col-span-full">
          <EndedStreamGallery />
        </section>
      </div>
    </>
  )
}
