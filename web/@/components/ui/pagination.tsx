/**
 * @Custom　2025/03/16
 *
 * Use `next-intl` for i18n
 * Add PaginationInfo, PaginationFirst
 * Add prefetch={true} for Next button
 * Add hidden sm:block for Previous button
 * Gap Adjustment:
 *    Changed the gap between pagination items from gap-1 to gap-4 sm:gap-1
 * PaginationLink Props Update:
 *    Added defaultVariant prop with options: 'default', 'secondary', 'ghost'
 *    Updated the variant logic to use defaultVariant instead of variant
 * Icon Sizing:
 *    Maintained relative top-[1px] alignment for both ChevronLeftIcon and ChevronRightIcon
 * Button Size Changes:
 *    Changed PaginationPrevious and PaginationNext sizes from default to sm
 *    Updated defaultVariant for PaginationPrevious to 'secondary'
 *    Updated defaultVariant for PaginationNext to 'default'
 */
import * as React from 'react'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
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
      className={cn('flex flex-row items-center gap-4 sm:gap-1', className)}
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
  defaultVariant?: 'default' | 'secondary' | 'ghost'
} & Pick<React.ComponentProps<typeof Button>, 'size'> &
  React.ComponentProps<typeof Link>

function PaginationLink({
  className,
  isActive,
  disabled,
  defaultVariant = 'ghost',
  href,
  size = 'icon',
  prefetch,
  ...props
}: PaginationLinkProps) {
  return (
    <Link
      aria-current={isActive ? 'page' : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? 'outline' : defaultVariant,
          size
        }),
        className,
        disabled && 'pointer-events-none opacity-50'
      )}
      href={disabled ? '#' : href}
      prefetch={prefetch}
      {...props}
    />
  )
}

/** SP専用：最初に戻るボタン */
function PaginationFirst({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  const t = useTranslations('Components.pagination')
  return (
    <PaginationLink
      aria-label={t('first')}
      size="sm"
      className={className}
      defaultVariant="secondary"
      {...props}
    >
      <ChevronsLeftIcon className="relative top-[1px]" />
    </PaginationLink>
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
      size="sm"
      className={cn('gap-1 px-2.5 sm:pl-2.5', className)}
      defaultVariant="secondary"
      {...props}
    >
      <ChevronLeftIcon className="relative top-[1px]" />
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
      size="sm"
      className={cn('gap-1 px-2.5 sm:pr-2.5', className)}
      defaultVariant="default"
      prefetch={true} // Next button is important, so prefetch is true
      {...props}
    >
      <span>{t('next')}</span>
      <ChevronRightIcon className="relative top-[1px]" />
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
      <span className="sr-only">
        {useTranslations('Components.pagination')('more')}
      </span>
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

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationFirst,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  PaginationInfo
}
