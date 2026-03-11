'use client'

import { useEffect, useRef, useState } from 'react'

export function useStreamingText(text: string) {
  const [charIndex, setCharIndex] = useState(0)
  const rafRef = useRef<number>(0)
  const lastTimeRef = useRef(0)

  useEffect(() => {
    const charInterval = 30

    const animate = (time: number) => {
      if (time - lastTimeRef.current >= charInterval) {
        lastTimeRef.current = time
        setCharIndex(prev => {
          if (prev >= text.length) return prev
          return prev + 1
        })
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [text])

  const displayedText = text.slice(0, charIndex)
  const isComplete = charIndex >= text.length

  return { displayedText, isComplete }
}
