'use client'

import { useTranslations } from 'next-intl'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationInfo,
  PaginationItem,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import useQueryString from 'hooks/useQueryString'
import { usePathname } from 'lib/navigation'

const QS_KEY = 'page'

const data = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `ユーザー ${i + 1}`,
  email: `user${i + 1}@example.com`
}))

const itemsPerPage = 10

type Props = {
  /** current page number (1-indexed) */
  current: number
  className?: string
}

export default function ResponsivePagination({ current, className }: Props) {
  const indexOfLastItem = current * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(data.length / itemsPerPage)

  const pathname = usePathname()
  const { has, createQueryString } = useQueryString()

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem className="hidden">
          <PaginationFirst
            href={`#`} // href="?page=1"
            disabled={current === 1}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious
            href={`${pathname}?${createQueryString(
              QS_KEY,
              Math.max(1, current - 1).toString()
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
        <PaginationItem className="hidden">
          <PaginationLast
            href={`#`} // href={`?page=${totalPages}`}
            disabled={current === totalPages}
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
  const { has, createQueryString } = useQueryString()

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
                  pageNumber.toString()
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
