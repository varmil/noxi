import { useTranslations } from 'next-intl'

export default function HeroSection() {
  const t = useTranslations('Pages.hyperChatGuideline.hero')

  return (
    <section className="py-12 sm:py-24">
      <div className="container px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            {t('title')}
          </h1>
        </div>
      </div>
    </section>
  )
}
