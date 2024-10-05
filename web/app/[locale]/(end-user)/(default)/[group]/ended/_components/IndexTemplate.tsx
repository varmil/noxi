import { PropsWithoutRef } from 'react'
import EndedStreamGallery from 'features/group/ended/components/EndedStreamGallery'
import { getGroup } from 'lib/server-only-context/cache'

type Props = {}

export async function IndexTemplate({}: PropsWithoutRef<Props>) {
  return (
    <>
      <div className="grid grid-cols-4 gap-2 sm:gap-2">
        <section className="col-span-full">
          <EndedStreamGallery where={{ group: getGroup() }} />
        </section>
      </div>
    </>
  )
}
