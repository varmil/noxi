'use client'

import { ComponentProps } from 'react'
import { Button } from '@/components/ui/button'
import useQueryString from 'hooks/useQueryString'
import { Link, usePathname } from 'lib/navigation'

/**
 * qsの１番目の要素をActive判定に用いる
 * pathnameを渡すことで、pathnameをまたいだリンクも可能
 */
export default function SelectButton({
  qs,
  isActive,
  activeVariant,
  pathname,
  pathnameMatchMode = 'includes',
  prefetch = false,
  className,
  children,
  ...rest
}: ComponentProps<typeof Button> & {
  qs: Record<string, string | null>
  isActive?: () => boolean
  activeVariant?: 'default' | 'secondary'
  pathname?: string
  pathnameMatchMode?: 'exact' | 'includes'
  prefetch?: boolean | null
}) {
  const currentPathname = usePathname()
  const { has, createQueryStrings } = useQueryString()
  const [key, val] = Object.entries(qs)[0]
  const active =
    isActive?.() ||
    (((val !== null && has(key, val)) || (val === null && !has(key))) &&
      (!pathname ||
        (pathnameMatchMode === 'exact'
          ? currentPathname === pathname
          : currentPathname.includes(pathname))))

  return (
    <Button
      className={`w-full font-normal justify-start ${className || ''}`}
      {...rest}
      asChild
      variant={active ? (activeVariant ?? 'default') : 'ghost'}
    >
      <Link
        href={`${pathname ?? currentPathname}${createQueryStrings(qs)}`}
        prefetch={prefetch}
        scroll={false}
      >
        {children}
      </Link>
    </Button>
  )
}
