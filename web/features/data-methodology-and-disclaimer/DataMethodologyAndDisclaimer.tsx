'use client'

import { useLocale } from 'next-intl'
import DataMethodologyAndDisclaimerEn from './DataMethodologyAndDisclaimerEn'
import DataMethodologyAndDisclaimerJa from './DataMethodologyAndDisclaimerJa'

export default function DataMethodologyAndDisclaimer() {
  const locale = useLocale()

  return (
    <div>
      {locale === 'ja' ? (
        <DataMethodologyAndDisclaimerJa />
      ) : (
        <DataMethodologyAndDisclaimerEn />
      )}
    </div>
  )
}
