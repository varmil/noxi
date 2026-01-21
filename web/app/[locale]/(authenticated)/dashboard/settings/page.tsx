import { Metadata } from 'next'
import SettingsContent from './_components/SettingsContent'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '通知設定 - マイページ - VCharts'
  }
}

export default function SettingsPage() {
  return <SettingsContent />
}
