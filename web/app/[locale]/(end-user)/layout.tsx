import { ReactNode } from 'react'
import { Metadata } from 'next'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { CookieAgreeBanner } from 'app/[locale]/(end-user)/_components/CookieAgreeBanner'
import Aside from 'components/Aside'

type Props = {
  children: ReactNode
  params: { locale: string }
}

export async function generateMetadata({
  params: { locale }
}: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Global' })

  return {
    title: `Home | ${t('title')}`,
    description: `Home`
  }
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: Props) {
  // Enable static rendering
  // unstable_setRequestLocale(locale)

  return (
    <>
      <Aside />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-16 bg-muted/40">
        {children}
      </div>
      <CookieAgreeBanner />
    </>
  )
}
