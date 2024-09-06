import React, { PropsWithoutRef } from 'react'
import FAQ from 'features/faq/FAQ'
import type { FAQs } from 'features/faq/types/FAQs'

type Props = {
  name: string
  faqs: FAQs
}

export default function FAQGallery({ name, faqs }: PropsWithoutRef<Props>) {
  return (
    <section className="w-full border-none shadow-none text-sm sm:text-base">
      <div>
        <div className="mb-4 text-muted-foreground">
          「前世やプロフィール、経歴はどんな感じなんだろう？」
          「顔バレはしてる？」 「炎上したことはあるのかな？」
          と、気になることがいっぱい。 そこで今回は{name}さんの 前世,
          経歴、年齢、顔バレ, 炎上
          について、順番に紐解いていきますので最後まで見ていってください!!
        </div>
      </div>
      <div className={``} itemScope itemType="https://schema.org/FAQPage">
        {faqs.map((faq, index) => (
          <FAQ key={index} {...faq} />
        ))}
      </div>
    </section>
  )
}
