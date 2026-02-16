import { MessagesSquare, Shield, Spotlight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

const FEATURE_ICONS = [MessagesSquare, Spotlight, Shield] as const
const FEATURE_KEYS = ['channelPage', 'standOut', 'anonymous'] as const

export default function FeaturesSection() {
  const t = useTranslations('Pages.hyperChatAbout.features')

  return (
    <section className="py-16 bg-muted/30">
      <div className="container px-4 sm:px-6">
        <h2 className="mb-8 text-center text-2xl font-bold sm:text-3xl">
          {t('title')}
        </h2>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
          {FEATURE_KEYS.map((key, i) => {
            const Icon = FEATURE_ICONS[i]
            return (
              <Card key={key}>
                <CardHeader>
                  <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="size-5 text-primary" />
                  </div>
                  <CardTitle className="text-base">
                    {t(`${key}.title`)}
                  </CardTitle>
                  <CardDescription>{t(`${key}.description`)}</CardDescription>
                </CardHeader>
              </Card>
            )
          })}
        </div>

      </div>
    </section>
  )
}
