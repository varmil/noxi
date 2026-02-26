import { useTranslations } from 'next-intl'
import TierTable from './TierTable'

export default function PricingSection() {
  const t = useTranslations('Pages.hyperChatAbout.features.tierTable')

  return (
    <section className="py-16 bg-muted/30">
      <div className="container px-4 sm:px-6">
        <h2 className="mb-8 text-center text-2xl font-bold sm:text-3xl">
          {t('title')}
        </h2>
        <div className="mx-auto max-w-4xl">
          <TierTable />
        </div>
      </div>
    </section>
  )
}
