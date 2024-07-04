import Aside from 'components/Aside'
import Site from 'config/constants/Site'
import { locales } from 'config/i18n/locale'
import { Metadata } from 'next'
import { unstable_setRequestLocale } from 'next-intl/server'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  params: { locale: string }
}

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export const metadata: Metadata = {
  title: `${Site.TITLE}`,
  description:
    'This example shows how to use Next.js along with Google Analytics.'
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: Props) {
  // Enable static rendering
  unstable_setRequestLocale(locale)

  return (
    <>
      <Aside />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 bg-muted/40">
        {children}
      </div>
    </>
  )
}
