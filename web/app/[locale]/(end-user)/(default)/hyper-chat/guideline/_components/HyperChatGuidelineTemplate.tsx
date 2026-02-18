import { ArrowLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from 'lib/navigation'
import GuidelineSection from './GuidelineSection'
import HeroSection from './HeroSection'
import ModerationSection from './ModerationSection'
import NoteSection from './NoteSection'

export default function HyperChatGuidelineTemplate() {
  const t = useTranslations('Pages.hyperChatGuideline')

  return (
    <>
      <HeroSection />
      <GuidelineSection />
      <ModerationSection />
      <NoteSection />
      <div className="py-16 text-center">
        <Link
          href="/hyper-chat"
          prefetch={false}
          className="inline-flex items-center text-muted-foreground hover:underline"
        >
          <ArrowLeft className="mr-1 size-4" />
          {t('backLink')}
        </Link>
      </div>
    </>
  )
}
