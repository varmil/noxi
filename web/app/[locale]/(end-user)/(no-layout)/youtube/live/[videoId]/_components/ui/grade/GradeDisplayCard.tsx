'use client'

import { PropsWithChildren, useState } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function GradeDisplay({
  className,
  children
}: PropsWithChildren<{
  className?: string
}>) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <Card
      className={`${className} ${
        isOpen ? 'relative flex lg:w-[350px] xl:w-[400px]' : 'hidden'
      }`}
    >
      <Button
        variant="ghost"
        size={'icon'}
        className={`absolute top-1 right-1 z-1`}
        onClick={() => setIsOpen(false)}
      >
        <X className="size-4" />
      </Button>

      <CardContent className="py-4 px-6">{children}</CardContent>
    </Card>
  )
}
