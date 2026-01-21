import { Metadata } from 'next'
import SubscriptionContent from './_components/SubscriptionContent'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'サブスクリプション - マイページ - VCharts'
  }
}

export default function SubscriptionPage() {
  return <SubscriptionContent />
}
