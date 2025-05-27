'use client'

import { PropsWithChildren, useEffect, useRef, useState } from 'react'
import {
  motion,
  useMotionValue,
  animate,
  useAnimationControls
} from 'framer-motion'

export default function CountMotion({
  value,
  className,
  children
}: PropsWithChildren<{
  /** target value */
  value: number
  className?: string
}>) {
  const count = useMotionValue(value)
  const [display, setDisplay] = useState(value.toLocaleString())
  const previousValue = useRef(value)
  const scaleControls = useAnimationControls()

  useEffect(() => {
    const from =
      previousValue.current + Math.round((value - previousValue.current) * 0.4)
    count.set(from)
    previousValue.current = value

    // スケールアップ開始
    scaleControls.start({
      scale: 1.15,
      transition: { duration: 0.16, ease: 'easeOut' }
    })

    const controls = animate(count, value, {
      duration: 1,
      ease: 'circOut',
      // 値のアニメーション
      onUpdate: latest => {
        setDisplay(Math.round(latest).toLocaleString())
      },
      // スケールを元に戻す
      onComplete: () => {
        scaleControls.start({
          scale: 1,
          transition: { duration: 0.16, ease: 'easeInOut' }
        })
      }
    })

    return () => controls.stop()
  }, [count, scaleControls, value])

  return (
    <>
      <motion.span
        className={`${className || ''} inline-block`}
        animate={scaleControls}
        initial={{ scale: 1 }}
      >
        {display}
        {children}
      </motion.span>
    </>
  )
}
