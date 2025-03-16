import * as React from 'react'
import {
  ChevronLeft,
  ChevronLeftIcon,
  ChevronRight,
  ChevronRightIcon,
  MoreHorizontalIcon
} from 'lucide-react'

import { useTranslations } from 'next-intl'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Link } from 'lib/navigation'

function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn('mx-auto flex w-full justify-center', className)}
      {...props}
    />
  )
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn('flex flex-row items-center gap-1', className)}
      {...props}
    />
  )
}

function PaginationItem({ ...props }: React.ComponentProps<'li'>) {
  return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = {
  isActive?: boolean
  disabled?: boolean
} & Pick<React.ComponentProps<typeof Button>, 'size'> &
  React.ComponentProps<typeof Link>

function PaginationLink({
  className,
  isActive,
  disabled,
  href,
  size = 'icon',
  ...props
}: PaginationLinkProps) {
  return (
    <Link
      aria-current={isActive ? 'page' : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? 'outline' : 'ghost',
          size
        }),
        className,
        disabled && 'pointer-events-none opacity-50'
      )}
      href={disabled ? '#' : href}
      {...props}
    />
  )
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  const t = useTranslations('Components.pagination')
  return (
    <PaginationLink
      aria-label={t('previous')}
      size="default"
      className={cn('gap-1 px-2.5 sm:pl-2.5', className)}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="hidden sm:block">{t('previous')}</span>
    </PaginationLink>
  )
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  const t = useTranslations('Components.pagination')
  return (
    <PaginationLink
      aria-label={t('next')}
      size="default"
      className={cn('gap-1 px-2.5 sm:pr-2.5', className)}
      {...props}
    >
      <span className="hidden sm:block">{t('next')}</span>
      <ChevronRightIcon />
    </PaginationLink>
  )
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn('flex size-9 items-center justify-center', className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  )
}

const PaginationInfo = ({
  className,
  ...props
}: React.ComponentProps<'span'>) => (
  <span
    className={cn('flex items-center justify-center', className)}
    {...props}
  />
)
PaginationInfo.displayName = 'PaginationInfo'

const PaginationFirst = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => {
  const t = useTranslations('Components.pagination')
  return (
    <PaginationLink
      aria-label={t('first')}
      size="default"
      className={cn('gap-1', className)}
      {...props}
    >
      <ChevronLeft className="relative h-4 w-4 top-[1px]" />
      <ChevronLeft className="relative h-4 w-4 top-[1px] -ml-2.5" />
    </PaginationLink>
  )
}
PaginationFirst.displayName = 'PaginationFirst'

const PaginationLast = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => {
  const t = useTranslations('Components.pagination')
  return (
    <PaginationLink
      aria-label={t('last')}
      size="default"
      className={cn('gap-1', className)}
      {...props}
    >
      <ChevronRight className="relative h-4 w-4 top-[1px]" />
      <ChevronRight className="relative h-4 w-4 top-[1px] -ml-2.5" />
    </PaginationLink>
  )
}
PaginationLast.displayName = 'PaginationLast'

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  PaginationInfo,
  PaginationFirst,
  PaginationLast
}
