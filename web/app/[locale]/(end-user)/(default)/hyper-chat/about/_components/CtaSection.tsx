import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Link } from 'lib/navigation'

export default function CtaSection() {
  const t = useTranslations('Pages.hyperChatAbout.cta')

  return (
    <section className="py-16 bg-muted">
      <div className="container px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl">{t('title')}</h2>
          <p className="mb-8 text-muted-foreground">{t('description')}</p>

          <Button asChild size="lg">
            <Link href="/hyper-chat">{t('button')}</Link>
          </Button>

          <div className="mt-6 flex justify-center gap-4 text-xs text-muted-foreground">
            <Link
              href="/legal/tokushoho"
              className="hover:underline"
              prefetch={false}
            >
              {t('legal.tokushoho')}
            </Link>
            <Link
              href="/terms-of-use-and-privacy-policy"
              className="hover:underline"
              prefetch={false}
            >
              {t('legal.terms')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
