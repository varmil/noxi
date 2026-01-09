'use client'

import { useSyncExternalStore } from 'react'

const emptySubscribe = () => () => {}

const getIsIOS = () =>
  typeof navigator !== 'undefined' &&
  /iPad|iPhone|iPod/.test(navigator.userAgent) &&
  !(window as any).MSStream

const getIsStandalone = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(display-mode: standalone)').matches

/** WIP */
export default function InstallPrompt() {
  const isIOS = useSyncExternalStore(emptySubscribe, getIsIOS, () => false)
  const isStandalone = useSyncExternalStore(
    emptySubscribe,
    getIsStandalone,
    () => false
  )

  if (isStandalone) {
    return null // Don't show install button if already installed
  }

  return (
    <div>
      <h3>Install App</h3>
      <button>Add to Home Screen</button>
      {isIOS && (
        <p>
          To install this app on your iOS device, tap the share button
          <span role="img" aria-label="share icon">
            {' '}
            ⎋{' '}
          </span>
          and then &quot;Add to Home Screen&quot;
          <span role="img" aria-label="plus icon">
            {' '}
            ➕{' '}
          </span>
          .
        </p>
      )}
    </div>
  )
}
