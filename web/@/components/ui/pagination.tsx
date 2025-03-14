import * as React from 'react'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { ButtonProps, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Link } from 'lib/navigation'

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn('mx-auto flex w-full justify-center', className)}
    {...props}
  />
)
Pagination.displayName = 'Pagination'

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn('flex flex-row items-center gap-1', className)}
    {...props}
  />
))
PaginationContent.displayName = 'PaginationContent'

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<'li'>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn('', className)} {...props} />
))
PaginationItem.displayName = 'PaginationItem'

type PaginationLinkProps = {
  isActive?: boolean
  disabled?: boolean
} & Pick<ButtonProps, 'size'> &
  React.ComponentProps<typeof Link>

const PaginationLink = ({
  className,
  isActive,
  disabled,
  href,
  size = 'icon',
  ...props
}: PaginationLinkProps) => (
  <Link
    aria-current={isActive ? 'page' : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? 'outline' : 'ghost',
        size
      }),
      'text-base sm:text-lg',
      className,
      disabled && 'pointer-events-none opacity-50'
    )}
    href={disabled ? '#' : href}
    {...props}
  />
)
PaginationLink.displayName = 'PaginationLink'

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => {
  const t = useTranslations('Components.pagination')
  return (
    <PaginationLink
      aria-label={t('previous')}
      size="default"
      className={cn('gap-1 pl-2.5', className)}
      {...props}
    >
      <ChevronLeft className="relative h-4 w-4 top-[1px]" />
      <span>{t('previous')}</span>
    </PaginationLink>
  )
}
PaginationPrevious.displayName = 'PaginationPrevious'

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => {
  const t = useTranslations('Components.pagination')
  return (
    <PaginationLink
      aria-label={t('next')}
      size="default"
      className={cn('gap-1 pr-2.5', className)}
      {...props}
    >
      <span>{t('next')}</span>
      <ChevronRight className="relative h-4 w-4 top-[1px]" />
    </PaginationLink>
  )
}
PaginationNext.displayName = 'PaginationNext'

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<'span'>) => (
  <span
    aria-hidden
    className={cn('flex h-9 w-9 items-center justify-center', className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">
      {useTranslations('Components.pagination')('more')}
    </span>
  </span>
)
PaginationEllipsis.displayName = 'PaginationEllipsis'

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
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationInfo,
  PaginationFirst,
  PaginationLast
}
