import React, { PropsWithoutRef } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@/components/ui/card'
import FAQ from 'features/faq/FAQ'

type Props = {
  name: string
  channelId: string
}

export default async function FAQGallery({
  name,
  channelId
}: PropsWithoutRef<Props>) {
  try {
    const { faqs } = await import(`./assets/hololive/${channelId}`)

    return (
      <Card>
        <CardHeader>
          <CardTitle>{name}の前世､経歴､年齢は? 顔バレは? 炎上した?</CardTitle>
          <CardDescription>
            VTuberの {name} さん。 「前世や経歴はどんな感じなんだろう？」
            「顔バレはしてる？」 「炎上したことはあるのかな？」
            と、気になることがたくさんありますよね。 そこで今回は、{name}さんの
            <li>前世</li>
            <li>経歴、年齢、顔バレ</li>
            <li>炎上</li>
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
  } catch (error) {
    return <p className="text-muted-foreground">NO FAQs</p>
  }
}
