'use client'

import { useTranslations } from 'next-intl'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationInfo,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import useQueryString from 'hooks/useQueryString'
import { usePathname } from 'lib/navigation'

const QS_KEY = 'page'

type Props = {
  /** 1..N */
  totalPages: number
  className?: string
}

/**
 * Use ?page=1, ?page=2, ...
 */
export default function ResponsivePagination({ totalPages, className }: Props) {
  const pathname = usePathname()
  const { get, createQueryString } = useQueryString()
  const total = Math.max(1, totalPages) // min 1
  const current = Number(get(QS_KEY)) || 1

  return (
    <Pagination className={`${className}`}>
      <PaginationContent>
        <PaginationItem className="flex w-[80px] justify-end gap-2">
          <PaginationFirst
            className="sm:hidden"
            href={`${pathname}${createQueryString(QS_KEY, null)}`}
            disabled={current === 1}
          />
          <PaginationPrevious
            href={`${pathname}${createQueryString(
              QS_KEY,
              Math.max(1, current - 1) === 1
                ? null
                : Math.max(1, current - 1).toString()
            )}`}
            disabled={current === 1}
          />
        </PaginationItem>
        <PaginationItem>
          <SP current={current} totalPages={total} />
          <NotSP current={current} totalPages={total} />
        </PaginationItem>
        <PaginationItem className="flex w-[80px]">
          <PaginationNext
            href={`${pathname}${createQueryString(
              QS_KEY,
              Math.min(total, current + 1).toString()
            )}`}
            disabled={current === total}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

const SP = ({
  current,
  totalPages
}: {
  current: number
  totalPages: number
}) => {
  const t = useTranslations('Components.pagination')
  return (
    <div className="contents sm:hidden">
      <PaginationInfo>
        {current} / {totalPages} {t('page')}
      </PaginationInfo>
    </div>
  )
}

const NotSP = ({
  current,
  totalPages
}: {
  current: number
  totalPages: number
}) => {
  const pathname = usePathname()
  const { createQueryString } = useQueryString()

  return (
    <div className="hidden sm:flex flex-row items-center gap-1">
      {[...Array(totalPages)].map((_, index) => {
        const pageNumber = index + 1
        if (
          pageNumber === 1 ||
          pageNumber === totalPages ||
          (pageNumber >= current - 2 && pageNumber <= current + 2)
        ) {
          return (
            <PaginationLink
              key={pageNumber}
              href={`${pathname}${createQueryString(
                QS_KEY,
                pageNumber === 1 ? null : pageNumber.toString()
              )}`}
              isActive={pageNumber === current}
            >
              {pageNumber}
            </PaginationLink>
          )
        } else if (pageNumber === current - 3 || pageNumber === current + 3) {
          return <PaginationEllipsis key={pageNumber} />
        }
        return null
      })}
    </div>
  )
}
