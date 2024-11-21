'use client'

import { ComponentProps } from 'react'
import { Button } from '@/components/ui/button'
import useQueryString from 'hooks/useQueryString'
import { Link, usePathname } from 'lib/navigation'

export default function SelectButton({
  qsKey,
  qsValue,
  activeVariant,

  children,
  className,
  ...rest
}: ComponentProps<typeof Button> & {
  activeVariant?: 'default' | 'secondary'
  qsKey: string
  qsValue: string | null
}) {
  const pathname = usePathname()
  const { has, createQueryString } = useQueryString()
  const active =
    (qsValue !== null && has(qsKey, qsValue)) ||
    (qsValue === null && !has(qsKey))

  return (
    <Button
      className={`w-full text-xs sm:text-sm h-8 sm:h-10 font-normal justify-start ${
        className || ''
      }`}
      {...rest}
      asChild
      variant={active ? activeVariant ?? 'default' : 'ghost'}
    >
      <Link
        href={`${pathname}?${createQueryString(qsKey, qsValue)}`}
        prefetch={true}
      >
        {children}
      </Link>
    </Button>
  )
}
