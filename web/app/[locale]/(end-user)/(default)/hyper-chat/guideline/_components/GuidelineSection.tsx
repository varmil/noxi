import { Ban, CheckCircle2, LucideIcon, ThumbsUp } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

function CategoryCard({
  icon: Icon,
  color,
  bgColor,
  title,
  items
}: {
  icon: LucideIcon
  color: string
  bgColor: string
  title: string
  items: { key: string; label: string }[]
}) {
  return (
    <Card>
      <CardHeader>
        <div
          className={`mb-2 flex size-10 items-center justify-center rounded-lg ${bgColor}`}
        >
          <Icon className={`size-5 ${color}`} />
        </div>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {items.map(({ key, label }) => (
            <li
              key={key}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <span className="mt-1.5 block size-1.5 shrink-0 rounded-full bg-current" />
              {label}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

export default function GuidelineSection() {
  const t = useTranslations('Pages.hyperChatGuideline.guideline')

  return (
    <section className="py-16 bg-muted/30">
      <div className="container px-4 sm:px-6">
        <h2 className="mb-8 text-center text-2xl font-bold sm:text-3xl">
          {t('title')}
        </h2>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
          <CategoryCard
            icon={ThumbsUp}
            color="text-green-600"
            bgColor="bg-green-500/10"
            title={t('recommended.title')}
            items={[
              { key: 'positive', label: t('recommended.items.positive') },
              { key: 'original', label: t('recommended.items.original') },
              { key: 'insightful', label: t('recommended.items.insightful') }
            ]}
          />
          <CategoryCard
            icon={CheckCircle2}
            color="text-blue-600"
            bgColor="bg-blue-500/10"
            title={t('acceptable.title')}
            items={[
              {
                key: 'introduction',
                label: t('acceptable.items.introduction')
              },
              { key: 'event', label: t('acceptable.items.event') },
              { key: 'discussion', label: t('acceptable.items.discussion') }
            ]}
          />
          <CategoryCard
            icon={Ban}
            color="text-red-600"
            bgColor="bg-red-500/10"
            title={t('prohibited.title')}
            items={[
              { key: 'illegal', label: t('prohibited.items.illegal') },
              { key: 'rumor', label: t('prohibited.items.rumor') },
              { key: 'offensive', label: t('prohibited.items.offensive') },
              { key: 'irrelevant', label: t('prohibited.items.irrelevant') }
            ]}
          />
        </div>
      </div>
    </section>
  )
}
