'use client'

import { PropsWithChildren } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'

export function RankingTableTitleContainer({
  children,
  className
}: PropsWithChildren<{ className?: string }>) {
  return (
    <section className={`flex ${className || ''}`}>
      <div className="flex flex-col sm:w-full sm:flex-row sm:justify-between sm:items-center sm:gap-x-8">
        {children}
      </div>
    </section>
  )
}

export function RankingTableTitleH1({
  title,
  className
}: {
  title: string
  className?: string
}) {
  return (
    <h1
      className={`flex items-center text-lg sm:text-xl font-bold ${
        className || ''
      }`}
      aria-label={title}
    >
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="flex gap-x-1 sm:gap-x-2 items-center text-left cursor-pointer"
          >
            <span className="tracking-tighter line-clamp-1">{title}</span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto max-w-xs p-2 text-sm">
          {title}
        </PopoverContent>
      </Popover>
    </h1>
  )
}

export function RankingTableTitleDescription({
  children,
  className
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={`text-sm text-muted-foreground ${className || ''}`}>
      {children}
    </div>
  )
}
