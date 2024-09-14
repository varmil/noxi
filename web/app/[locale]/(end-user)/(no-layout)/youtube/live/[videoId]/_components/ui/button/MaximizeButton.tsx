'use client'

import { Maximize } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useQueryString from 'hooks/useQueryString'
import { Link, usePathname } from 'lib/navigation'

const QS_KEY = 'theater'

export default function MaximizeButton() {
  const pathname = usePathname()
  const { has, createQueryString } = useQueryString()

  return (
    <Button asChild variant="outline" className="w-full">
      <Link
        href={`${pathname}?${createQueryString(QS_KEY, '1')}`}
        prefetch={true}
        replace
      >
        <Maximize className="mr-2 h-4 w-4" />
        シアターモードで大きく表示する
      </Link>
    </Button>
  )
}
