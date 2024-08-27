import { ReactNode } from 'react'
import { unstable_setRequestLocale } from 'next-intl/server'
import { CookieAgreeBanner } from 'app/[locale]/(end-user)/_components/CookieAgreeBanner'
import Aside from 'components/Aside'
import Site from 'config/constants/Site'
import { setGroup } from 'lib/server-only-context/cache'

type Props = {
  children: ReactNode
  params: { locale: string; group: (typeof Site.Groups)[number] }
}

export default async function LocaleLayout({
  children,
  params: { locale, group }
}: Props) {
  // Enable static rendering
  unstable_setRequestLocale(locale)
  setGroup(group)

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
