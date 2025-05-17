'use client'

import { useEffect, useState } from 'react'
import confetti from 'canvas-confetti'
import { Heart } from 'lucide-react'

interface Props {
  ticketCount: number
}

export function SuccessEffect({ ticketCount }: Props) {
  const [hearts, setHearts] = useState<
    {
      id: number
      x: number
      y: number
      size: number
      speed: number
      opacity: number
    }[]
  >([])

  useEffect(() => {
    // 応援チケットの枚数に応じて紙吹雪の量を調整
    const intensity = Math.min(Math.max(20, ticketCount * 5), 200)

    function fire(particleRatio: number, opts: any) {
      confetti({
        origin: { y: 0.7 },
        ...opts,
        particleCount: Math.floor(intensity * particleRatio)
      })
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55
    })
    fire(0.2, {
      spread: 60
    })
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    })
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    })
    fire(0.1, {
      spread: 120,
      startVelocity: 45
    })

    // ハートのアニメーション
    const heartCount = Math.min(20, 5 + ticketCount * 2)
    const newHearts = Array.from({ length: heartCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 110 + Math.random() * 20,
      size: 10 + Math.random() * 20,
      speed: 1 + Math.random() * 2,
      opacity: 0.7 + Math.random() * 0.3
    }))

    setHearts(newHearts)

    const interval = setInterval(() => {
      setHearts(prev =>
        prev
          .map(heart => ({
            ...heart,
            y: heart.y - heart.speed,
            opacity: heart.y < 30 ? heart.opacity * 0.95 : heart.opacity
          }))
          .filter(heart => heart.opacity > 0.1)
      )
    }, 50)

    return () => {
      clearInterval(interval)
    }
  }, [ticketCount])

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="absolute"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
            opacity: heart.opacity,
            transform: `scale(${heart.size / 15})`,
            transition: 'top 0.5s ease-out, opacity 0.5s ease-out'
          }}
        >
          <Heart className="text-pink-500 fill-pink-500" />
        </div>
      ))}
    </div>
  )
}
