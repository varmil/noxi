'use client'

import { useCallback, useEffect } from 'react'
import confetti from 'canvas-confetti'

/** レベルに応じた紙吹雪の色 */
const LEVEL_CONFETTI_COLORS: Record<number, string[]> = {
  1: ['#3b82f6', '#60a5fa', '#93c5fd'],
  2: ['#2563eb', '#3b82f6', '#60a5fa'],
  3: ['#6366f1', '#818cf8', '#a5b4fc'],
  4: ['#8b5cf6', '#a78bfa', '#c4b5fd'],
  5: ['#a855f7', '#c084fc', '#d8b4fe'],
  6: ['#d946ef', '#e879f9', '#f0abfc'],
  7: ['#ec4899', '#f472b6', '#f9a8d4'],
  8: ['#f43f5e', '#fb7185', '#fda4af'],
  9: ['#ea580c', '#f97316', '#fb923c'],
  10: ['#f43f5e', '#ef4444', '#ec4899', '#fbbf24', '#f97316']
}

function getLevelConfettiColors(level: number): string[] {
  return LEVEL_CONFETTI_COLORS[level] ?? LEVEL_CONFETTI_COLORS[1]
}

type Props = {
  /** ハイプトレインのレベル (1-10) */
  level: number
  /** 紙吹雪の発射起点となる要素 */
  anchorRef: React.RefObject<HTMLElement | null>
}

export function HyperTrainConfetti({ level, anchorRef }: Props) {
  const fireConfetti = useCallback(() => {
    if (!anchorRef.current) return

    const rect = anchorRef.current.getBoundingClientRect()
    const y = (rect.bottom + 4) / window.innerHeight
    const colors = getLevelConfettiColors(level)
    // レベルが高いほど紙吹雪を多く
    const particleCount = Math.min(15 + level * 20, 200)

    // 左側から発射
    confetti({
      particleCount: Math.ceil(particleCount / 2),
      angle: 60,
      spread: 50,
      origin: { x: 0.15, y },
      colors,
      startVelocity: 20 + level * 2,
      gravity: 0.8,
      ticks: 150,
      scalar: 0.8,
      zIndex: 40
    })

    // 右側から発射
    confetti({
      particleCount: Math.ceil(particleCount / 2),
      angle: 120,
      spread: 50,
      origin: { x: 0.85, y },
      colors,
      startVelocity: 20 + level * 2,
      gravity: 0.8,
      ticks: 150,
      scalar: 0.8,
      zIndex: 40
    })
  }, [level, anchorRef])

  useEffect(() => {
    // 初回は少し遅らせて発射
    const initialTimeout = setTimeout(fireConfetti, 500)

    // レベルに応じて間隔を調整（高レベルほど頻繁）
    const intervalMs = Math.max(6000 - level * 300, 3000)
    const interval = setInterval(fireConfetti, intervalMs)

    return () => {
      clearTimeout(initialTimeout)
      clearInterval(interval)
    }
  }, [level, fireConfetti])

  return null
}
