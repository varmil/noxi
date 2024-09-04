import React, { PropsWithoutRef } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@/components/ui/card'
import FAQ from 'features/faq/FAQ'
import type { FAQs } from 'features/faq/types/FAQs'

type Props = {
  name: string
  faqs: FAQs
}

export default async function FAQGallery({
  name,
  faqs
}: PropsWithoutRef<Props>) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}のまとめ</CardTitle>
        <CardDescription>
          VTuberの {name} さん。 「前世や経歴はどんな感じなんだろう？」
          「顔バレはしてる？」 「炎上したことはあるのかな？」
          と、気になることがたくさんありますよね。 そこで今回は、{name}さんの
          前世, 経歴、年齢、顔バレ, 炎上
          について、順番に紐解いていきますので最後まで見ていってください!!
        </CardDescription>
      </CardHeader>
      <CardContent
        className={``}
        itemScope
        itemType="https://schema.org/FAQPage"
      >
        {faqs.map((faq, index) => (
          <FAQ key={index} {...faq} />
        ))}
      </CardContent>
    </Card>
  )
}
