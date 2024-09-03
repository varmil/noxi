import React from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@/components/ui/card'
import FAQ from 'features/faq/FAQ'

const faqs = [
  {
    question: '湊あくあは引退するのですか？',
    answer:
      '現時点で湊あくあの引退の予定はありません。彼女は活発に配信を続けており、ファンとの交流を大切にしています。ただし、VTuber業界は変化が激しいため、最新の情報は公式チャンネルや公式SNSで確認することをおすすめします。'
  },
  {
    question: '湊あくあの顔バレは？',
    answer:
      'VTuberの特性上、湊あくあの実際の顔は公開されていません。VTuberはキャラクターとしての活動が主であり、実際の容姿は非公開となっています。ファンの皆さまには、キャラクターとしての湊あくあを楽しんでいただくことをおすすめします。'
  },
  {
    question: '湊あくあの年齢は？',
    answer:
      '湊あくあの公式設定では年齢は非公開となっています。多くのVTuberと同様、実年齢は明かされていません。ファンの間では様々な推測がありますが、正確な年齢は不明です。キャラクターとしての魅力を楽しむことが大切です。'
  },
  {
    question: '湊あくあの前世はXXX！？',
    answer:
      'VTuberの「前世」（以前の活動）に関する噂や推測は多くありますが、公式に認められた情報ではありません。VTuberのプライバシーを尊重し、現在の活動を楽しむことが重要です。湊あくあの場合も、現在のキャラクターとしての活動に焦点を当てることをおすすめします。'
  }
]

export default function FAQGallery() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>xxx</CardTitle>
        <CardDescription>yyy</CardDescription>
      </CardHeader>
      <CardContent className={``}>
        {faqs.map((faq, index) => (
          <FAQ key={index} {...faq} />
        ))}
      </CardContent>
    </Card>
  )
}
