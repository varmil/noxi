'use client'

import { useLocale } from 'next-intl'
import TermsAndPPEn from './terms-and-pp-en'
import TermsAndPPJa from './terms-and-pp-ja'

export default function TermsOfUseAndPrivacyPolicy() {
  const locale = useLocale()

  return <div>{locale === 'ja' ? <TermsAndPPJa /> : <TermsAndPPEn />}</div>
}
