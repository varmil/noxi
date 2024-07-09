import { Plane } from 'lucide-react'
import IconBlock from 'features/icon-section/IconBlock'

export default function IconSectionForReview() {
  return (
    <>
      <section className="py-4">
        <h3 className="mb-2 text-2xl lg:text-3xl">Travel</h3>
        <div className="grid  gap-2">
          <IconBlock
            href="/youtube/queries/travel_vlog_english/channels"
            icon={
              <Plane className="flex-shrink-0 w-6 h-6 text-primary-foreground" />
            }
            title="Travel Vlogs"
            description={
              "A travel vlog is a video content that records memories from a travel destination. There are various styles, such as works that focus on the journey rather than tourist spots and activities, and formats in which you capture your own figure and face using a selfie stick or tripod. Because Vlogs are recorded with video and audio, they can leave a sense of realism that cannot be conveyed in words. They can also express personal aspects such as the poster's humanity and values."
            }
          />
        </div>
      </section>
    </>
  )
}
