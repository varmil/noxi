'use client'

import { PropsWithChildren, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'

const gridClass = 'grid grid-cols-1 gap-y-8'

export function CommentGalleryContent({ children }: PropsWithChildren) {
  return (
    <section>
      <div className={gridClass}>{children}</div>
    </section>
  )
}

export function CommentGalleryFirstView({ children }: PropsWithChildren) {
  return <section className={gridClass}>{children}</section>
}

export function CommentGalleryMore({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslations('Components.styles')
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleContent className={gridClass}>{children}</CollapsibleContent>
      <CollapsibleTrigger asChild className={`w-full ${isOpen && 'hidden'}`}>
        <Button variant="outline" className="w-full">
          {t('more')}
        </Button>
      </CollapsibleTrigger>
    </Collapsible>
  )
}
