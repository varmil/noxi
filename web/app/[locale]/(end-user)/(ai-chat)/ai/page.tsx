import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import AiDemoChat from 'features/ai-demo/components/AiDemoChat'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'VCharts AI - 生成AIによる独自データ分析',
    description:
      'VCharts内の高品質なデータをもとに回答する唯一の生成AIサービスです'
  }
}

export default async function AiPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale as 'ja' | 'en')

  return <AiDemoChat />
}
