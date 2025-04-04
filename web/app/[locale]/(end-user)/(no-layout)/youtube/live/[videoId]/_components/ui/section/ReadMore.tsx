'use client'

import { PropsWithChildren, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ReadMore({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false)
  const xsClasses = isOpen ? 'contents' : 'hidden'

  return (
    <>
      <div className={`${xsClasses} lg:contents`}>{children}</div>

      {isOpen ? null : (
        <div className="flex items-center justify-center lg:hidden">
          <Button
            variant="ghost"
            onClick={() => setIsOpen(true)}
            aria-label="Show more"
          >
            <ChevronDown className="size-4" />
          </Button>
        </div>
      )}
    </>
  )
}
