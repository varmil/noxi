'use client'

import type { ReactNode } from 'react'
import { PanelLeftIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetDescription,
  SheetTitle
} from '@/components/ui/sheet'
import { usePathname } from 'lib/navigation'

type Props = {
  children: ReactNode
}

export function HeaderXSSheetClient({ children }: Props) {
  const pathname = usePathname()

  // pathnameをkeyに使うことで、パス変更時にSheetがリマウントされ閉じた状態に戻る
  return (
    <Sheet key={pathname}>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost" className="lg:hidden">
          <PanelLeftIcon className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[290px] p-0 pt-1" hideCloseButton>
        <SheetHeader hidden>
          <SheetTitle hidden>VCharts</SheetTitle>
          <SheetDescription hidden></SheetDescription>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  )
}
