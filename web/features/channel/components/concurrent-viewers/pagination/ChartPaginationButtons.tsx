'use client'

import { PropsWithoutRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import useQueryString from 'hooks/useQueryString'
import { Link, usePathname } from 'lib/navigation'

const QS_KEY = 'page'

type Props = {
  /** 1..N */
  totalPages: number
  className?: string
}

export default function ChartPaginationButtons({
  totalPages,
  className
}: PropsWithoutRef<Props>) {
  const feat = useTranslations('Features.youtube.stats.button')
  const pathname = usePathname()
  const { get, createQueryString } = useQueryString()
  const total = Math.max(1, totalPages) // min 1
  const current = Number(get(QS_KEY)) || 1

  return (
    <div className={`flex justify-between ${className || ''}`}>
      <Button variant="outline" className="w-[120px]" asChild>
        <Link
          href={`${pathname}${createQueryString(
            QS_KEY,
            Math.min(total, current + 1).toString()
          )}`}
          className={current === total ? 'pointer-events-none opacity-50' : ''}
          scroll={false}
        >
          <ChevronLeft className="mr-2 size-4 relative top-[1px]" />
          {feat('previous')}
        </Link>
      </Button>
      <Button variant="outline" className="w-[120px]" asChild>
        <Link
          href={`${pathname}${createQueryString(
            QS_KEY,
            Math.max(1, current - 1) === 1
              ? null
              : Math.max(1, current - 1).toString()
          )}`}
          className={current === 1 ? 'pointer-events-none opacity-50' : ''}
          scroll={false}
        >
          {feat('next')}
          <ChevronRight className="ml-2 size-4 relative top-[1px]" />
        </Link>
      </Button>
    </div>
  )
}
