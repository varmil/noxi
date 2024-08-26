import { Plane } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Separator } from '@/components/ui/separator'
import Image from 'components/styles/Image'
import IconBlock from 'features/icon-section/IconBlock'

export default function IconSectionForReview() {
  const t = useTranslations('Page.index.section')

  return (
    <>
      <section className="py-4">
        <h3 className="mb-2 text-2xl lg:text-3xl">VTubers</h3>
        <div className="grid gap-6">
          <IconBlock
            href="/hololive"
            image={
              <Image
                src={'/top_logo_hololive.svg'}
                alt={`ホロライブ`}
                width={734 / 2}
                height={518 / 2}
              />
            }
            title={t('hololive.title')}
            description={t('hololive.description')}
          />
          <IconBlock
            href="/hololive"
            image={
              <Image
                src={'/top_logo_hololive_en.svg'}
                alt={`Hololive English`}
                width={734 / 2}
                height={518 / 2}
              />
            }
            title={t('hololive-english.title')}
            description={t('hololive-english.description')}
          />
          <IconBlock
            href="/hololive"
            image={
              <Image
                src={'/top_logo_hololive_id.svg'}
                alt={`Hololive Indonesia`}
                width={734 / 2}
                height={518 / 2}
              />
            }
            title={t('hololive-indonesia.title')}
            description={t('hololive-indonesia.description')}
          />
        </div>

        <Separator className="my-2 sm:my-4" />

        <h3 className="mt-8 mb-2 text-2xl lg:text-3xl">YouTube</h3>
        <div className="grid gap-2">
          <IconBlock
            href="/youtube/charts/channels"
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
