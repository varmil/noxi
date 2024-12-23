'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import {
  Pagination,
  PaginationContent,
  PaginationInfo,
  PaginationItem,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'

const data = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `ユーザー ${i + 1}`,
  email: `user${i + 1}@example.com`
}))

const itemsPerPage = 10

export default function TwoButtonsPagination() {
  const t = useTranslations('Components.pagination')
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
        <PaginationItem>
          <PaginationPrevious
            href={'#'}
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationInfo>
            {currentPage} / {totalPages} {t('page')}
          </PaginationInfo>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href={'#'}
            onClick={() =>
              handlePageChange(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
