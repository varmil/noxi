'use client'

import { useState } from 'react'
import { Search, Trophy } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import AuthModal from 'components/auth/dialog/AuthModal'
import { Link } from 'lib/navigation'

export default function CtaSection() {
  const { data: session } = useSession()
  const t = useTranslations('Pages.hyperChatAbout.cta')
  const [authModalOpen, setAuthModalOpen] = useState(false)

  return (
    <section className="py-16 bg-muted">
      <div className="container px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl">{t('title')}</h2>
          <p className="mb-8 text-muted-foreground">{t('description')}</p>

          {session ? (
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
              <Button asChild size="lg" className="w-[260px] rounded-4xl">
                <Link href="/ranking/super-chat/channels/all/last24Hours">
                  <Trophy className="size-4" />
                  {t('rankingButton')}
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-[260px] rounded-4xl"
              >
                <Link href="/groups">
                  <Search className="size-4" />
                  {t('searchButton')}
                </Link>
              </Button>
            </div>
          ) : (
            <>
              <Button
                size="lg"
                className="rounded-4xl shadow-sm"
                onClick={() => setAuthModalOpen(true)}
              >
                {t('loginButton')}
              </Button>
              <AuthModal
                open={authModalOpen}
                onOpenChange={setAuthModalOpen}
                redirectTo="/dashboard/tickets"
              />
            </>
          )}

          {session ? (
            <p className="mt-6 text-xs sm:text-sm text-muted-foreground">
              <Link
                href="/hyper-chat/guideline"
                className="underline underline-offset-4 hover:text-foreground"
              >
                {t('guidelineLink')}
              </Link>
            </p>
          ) : (
            <p className="mt-6 text-xs sm:text-sm text-muted-foreground">
              {t('loginHint')}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
