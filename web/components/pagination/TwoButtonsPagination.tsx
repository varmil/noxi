'use client'

import { useState } from 'react'
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

const data = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `ユーザー ${i + 1}`,
  email: `user${i + 1}@example.com`
}))

const itemsPerPage = 10

type Props = {
  className?: string
}

export default function TwoButtonsPagination({ className }: Props) {
  const [currentPage, setCurrentPage] = useState(1)

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(data.length / itemsPerPage)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem className="hidden">
          <PaginationFirst
            href={`#`} // href="?page=1"
            disabled={currentPage === 1}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          />
        </PaginationItem>
        <SP currentPage={currentPage} totalPages={totalPages} />
        <NotSP
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
        <PaginationItem>
          <PaginationNext
            href="#"
            disabled={currentPage === totalPages}
            onClick={() =>
              handlePageChange(Math.min(totalPages, currentPage + 1))
            }
          />
        </PaginationItem>
        <PaginationItem className="hidden">
          <PaginationLast
            href={`#`} // href={`?page=${totalPages}`}
            disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

const SP = ({
  currentPage,
  totalPages
}: {
  currentPage: number
  totalPages: number
}) => {
  const t = useTranslations('Components.pagination')
  return (
    <div className="contents sm:hidden">
      <PaginationItem>
        <PaginationInfo>
          {currentPage} / {totalPages} {t('page')}
        </PaginationInfo>
      </PaginationItem>
    </div>
  )
}

const NotSP = ({
  currentPage,
  totalPages,
  handlePageChange
}: {
  currentPage: number
  totalPages: number
  handlePageChange: (pageNumber: number) => void
}) => {
  return (
    <div className="hidden sm:contents">
      {[...Array(totalPages)].map((_, index) => {
        const pageNumber = index + 1
        if (
          pageNumber === 1 ||
          pageNumber === totalPages ||
          (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
        ) {
          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                href="#"
                onClick={() => handlePageChange(pageNumber)}
                isActive={pageNumber === currentPage}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          )
        } else if (
          pageNumber === currentPage - 2 ||
          pageNumber === currentPage + 2
        ) {
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
