import { Bot, UserRoundCheck } from 'lucide-react'
import { useTranslations } from 'next-intl'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

const ITEMS = [
  { key: 'manual', icon: UserRoundCheck },
  { key: 'ai', icon: Bot }
] as const

export default function ModerationSection() {
  const t = useTranslations('Pages.hyperChatGuideline.moderation')

  return (
    <section className="py-16">
      <div className="container px-4 sm:px-6">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-8 text-center text-2xl font-bold sm:text-3xl">
            {t('title')}
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {ITEMS.map(({ key, icon: Icon }) => (
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
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
