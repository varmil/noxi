'use client'

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
  ReactNode,
  FC
} from 'react'
import { Lightbulb, Share } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'

// BeforeInstallPromptEvent の型定義
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
}

const PWAInstallContext = createContext<BeforeInstallPromptEvent | null>(null)

// Provider コンポーネント（root layout に配置）
export const PWAInstallProvider: FC<{ children: ReactNode }> = ({
  children
}) => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
    }
    window.addEventListener('beforeinstallprompt', handler as EventListener)
    return () =>
      window.removeEventListener(
        'beforeinstallprompt',
        handler as EventListener
      )
  }, [])

  return (
    <PWAInstallContext.Provider value={deferredPrompt}>
      {children}
    </PWAInstallContext.Provider>
  )
}

// Hook: 子コンポーネントから呼び出して deferredPrompt を取得
const usePWAInstallPrompt = () => useContext(PWAInstallContext)

const emptySubscribe = () => () => {}

const getIsIOSSafari = () => {
  if (typeof window === 'undefined') return false
  const ua = window.navigator.userAgent
  const isIOS = /iPad|iPhone|iPod/.test(ua)
  const isSafari = /^((?!chrome|android).)*safari/i.test(ua)
  const standalone =
    'standalone' in window.navigator && (window.navigator as any).standalone
  return isIOS && isSafari && !standalone
}

/** @deprecated インストールボタンコンポーネント */
export const PWAInstallButton: FC = () => {
  const deferredPrompt = usePWAInstallPrompt()
  const isIOSSafari = useSyncExternalStore(
    emptySubscribe,
    getIsIOSSafari,
    () => false
  )

  // PWAインストール不可能 and iOS Safari の案内が必要ない場合は何も表示しない
  if (!deferredPrompt && !isIOSSafari) return null

  const handleClick = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    console.log('PWA install choice:', outcome)
    // 追加のロジックがあればここで行う
  }

  return (
    <>
      {deferredPrompt && (
        <Button onClick={handleClick} className="">
          アプリをホーム画面に追加
        </Button>
      )}
      {isIOSSafari && (
        <Alert>
          <Lightbulb className="size-4" />
          <AlertTitle>アプリでもっと快適に！</AlertTitle>
          <AlertDescription>
            <span>
              Safariの共有ボタン
              <Share className="size-4 inline relative -top-px mx-1" />
              をタップし<strong>「ホーム画面に追加」</strong>
              を選択してください
            </span>
          </AlertDescription>
        </Alert>
      )}
    </>
  )
}
