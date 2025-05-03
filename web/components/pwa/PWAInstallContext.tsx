'use client'

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  FC
} from 'react'
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

// インストールボタンコンポーネント
export const PWAInstallButton: FC = () => {
  const deferredPrompt = usePWAInstallPrompt()
  if (!deferredPrompt) return null

  const handleClick = async () => {
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    console.log('PWA install choice:', outcome)
    // 一度使ったらクリア
    // 追加のロジックがあればここで行う
  }

  return (
    <Button onClick={handleClick} className="">
      ホーム画面に追加
    </Button>
  )
}
