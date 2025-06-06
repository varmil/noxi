'use client'

import { PropsWithoutRef } from 'react'
import { Roboto_Condensed } from 'next/font/google'

const robotoCondensed = Roboto_Condensed({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700']
})

type Props = {
  className?: string
}

export default function VChartsText({ className }: PropsWithoutRef<Props>) {
  return (
    <span
      className={`${robotoCondensed.className} font-bold text-[20px]  ${className || ''}`}
    >
      VCharts
    </span>
  )
}
