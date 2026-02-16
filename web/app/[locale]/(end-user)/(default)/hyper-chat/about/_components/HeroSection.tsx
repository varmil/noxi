import { useTranslations } from 'next-intl'
import { Badge } from '@/components/ui/badge'
import ZoomableImage from 'components/image/ZoomableImage'

export default function HeroSection() {
  const t = useTranslations('Pages.hyperChatAbout.hero')

  return (
    <section className="py-12 sm:py-24">
      <div className="container px-4 sm:px-6">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 lg:flex-row lg:gap-12">
          <div className="text-center lg:flex-1 lg:text-left">
            <Badge variant="secondary" className="mb-4">
              {t('badge')}
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
              {t('title')}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t('subtitle1')}
              <br />
              {t('subtitle2')}
            </p>
          </div>

          <div className="flex w-full min-w-0 gap-4 lg:flex-1">
            <ZoomableImage
              src="/images/lp/ranking-page-v2.jpg"
              alt="HyperChat on ranking page"
              width={1200}
              height={675}
              className="min-w-0 flex-1 rounded-lg border shadow-xl"
            />
            <ZoomableImage
              src="/images/lp/hyper-chat-detail.png"
              alt="HyperChat detail"
              width={1200}
              height={675}
              className="min-w-0 flex-1 rounded-lg border shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
