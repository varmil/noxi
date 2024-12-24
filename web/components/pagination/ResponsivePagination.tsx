'use client'

import { useTranslations } from 'next-intl'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
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
  const current = Number(get(QS_KEY) || 1)

  return (
    <Pagination className={className}>
      <PaginationContent>
        {/* <PaginationItem className="hidden">
          <PaginationFirst
            href={`#`} // href="?page=1"
            disabled={current === 1}
          />
        </PaginationItem> */}
        <PaginationItem>
          <PaginationPrevious
            href={`${pathname}?${createQueryString(
              QS_KEY,
              Math.max(1, current - 1) === 1
                ? null
                : Math.max(1, current - 1).toString()
            )}`}
            disabled={current === 1}
          />
        </PaginationItem>
        <SP current={current} totalPages={totalPages} />
        <NotSP current={current} totalPages={totalPages} />
        <PaginationItem>
          <PaginationNext
            href={`${pathname}?${createQueryString(
              QS_KEY,
              Math.min(totalPages, current + 1).toString()
            )}`}
            disabled={current === totalPages}
          />
        </PaginationItem>
        {/* <PaginationItem className="hidden">
          <PaginationLast
            href={`#`} // href={`?page=${totalPages}`}
            disabled={current === totalPages}
          />
        </PaginationItem> */}
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
      <PaginationItem>
        <PaginationInfo>
          {current} / {totalPages} {t('page')}
        </PaginationInfo>
      </PaginationItem>
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
    <div className="hidden sm:contents">
      {[...Array(totalPages)].map((_, index) => {
        const pageNumber = index + 1
        if (
          pageNumber === 1 ||
          pageNumber === totalPages ||
          (pageNumber >= current - 1 && pageNumber <= current + 1)
        ) {
          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                href={`${pathname}?${createQueryString(
                  QS_KEY,
                  pageNumber === 1 ? null : pageNumber.toString()
                )}`}
                isActive={pageNumber === current}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          )
        } else if (pageNumber === current - 2 || pageNumber === current + 2) {
          return (
            <PaginationItem key={pageNumber}>
              <PaginationEllipsis />
            </PaginationItem>
          )
        }
        return null
      })}
    </div>
  )
}
