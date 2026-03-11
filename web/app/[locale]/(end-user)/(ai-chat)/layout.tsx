import { PropsWithChildren } from 'react'
import { ArrowLeft } from 'lucide-react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { routing } from 'config/i18n/routing'
import AiChatProvider from 'features/ai-demo/components/AiChatProvider'
import ChatHistorySheet from 'features/ai-demo/components/ChatHistorySheet'
import NewChatButton from 'features/ai-demo/components/NewChatButton'
import { Link } from 'lib/navigation'

type Props = {
  params: Promise<{ locale: string }>
}

export default async function AiChatLayout({
  children,
  params
}: PropsWithChildren<Props>) {
  const { locale } = await params

  if (!routing.locales.includes(locale as 'ja' | 'en')) {
    throw new Error(`Unsupported locale: ${locale}`)
  }

  setRequestLocale(locale as 'ja' | 'en')
  const t = await getTranslations('Features.aiDemo')

  return (
    <AiChatProvider>
      <div className="flex h-dvh flex-col">
        <header className="flex items-center gap-4 sm:gap-6 border-b px-3 py-2">
          <ChatHistorySheet />
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-4" />
            <span>{t('backToVCharts')}</span>
          </Link>
          <div className="ml-auto sm:ml-0">
            <NewChatButton />
          </div>
        </header>
        <main className="flex-1 overflow-hidden">{children}</main>
      </div>
    </AiChatProvider>
  )
}
