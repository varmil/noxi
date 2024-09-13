'use client'

import { Minimize } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link, usePathname } from 'lib/navigation'

export default function MinimizeButton() {
  const pathname = usePathname()

  return (
    <Button asChild variant="ghost" size="icon">
      <Link href={`${pathname}`} prefetch={true}>
        <Minimize className="h-6 w-6" />
      </Link>
    </Button>
  )
}
