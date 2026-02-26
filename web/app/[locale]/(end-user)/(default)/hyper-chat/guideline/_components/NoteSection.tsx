import { useTranslations } from 'next-intl'

export default function NoteSection() {
  const t = useTranslations('Pages.hyperChatGuideline.note')

  return (
    <section className="py-16 bg-muted/30">
      <div className="container px-4 sm:px-6">
        <div className="mx-auto max-w-2xl">
          <p className="text-center text-sm text-muted-foreground">
            {t('description')}
          </p>
        </div>
      </div>
    </section>
  )
}
