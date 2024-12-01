'use client'

import { ComponentProps } from 'react'
import { Button } from '@/components/ui/button'
import useQueryString from 'hooks/useQueryString'
import { Link, usePathname } from 'lib/navigation'

export default function SelectButton({
  qs,
  activeVariant,

  children,
  className,
  ...rest
}: ComponentProps<typeof Button> & {
  activeVariant?: 'default' | 'secondary'
  qs: Record<string, string | null>
}) {
  const pathname = usePathname()
  const { has, createQueryStrings } = useQueryString()
  const active = Object.entries(qs).some(([key, val]) => {
    return (val !== null && has(key, val)) || (val === null && !has(key))
  })

  return (
    <Button
      className={`w-full text-xs sm:text-sm h-8 sm:h-10 font-normal justify-start ${
        className || ''
      }`}
      {...rest}
      asChild
      variant={active ? activeVariant ?? 'default' : 'ghost'}
    >
      <Link href={`${pathname}?${createQueryStrings(qs)}`} prefetch={true}>
        {children}
      </Link>
    </Button>
  )
}
