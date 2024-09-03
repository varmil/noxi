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
  channelId: string
}

export default async function FAQGallery({
  channelId
}: PropsWithoutRef<Props>) {
  try {
    const { faqs } = await import(`./assets/hololive/${channelId}`)
    console.log('faqs', channelId, faqs)

    return (
      <Card>
        <CardHeader>
          <CardTitle>xxx</CardTitle>
          <CardDescription>yyy</CardDescription>
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
