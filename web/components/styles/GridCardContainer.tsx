'use client'

import { PropsWithChildren, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'

type Props = PropsWithChildren<{
  className?: string
}>

const gridGapYClasses = 'gap-y-6 @xl:gap-y-8'

const getGridClasses = (className?: string) => {
  return `grid gap-x-2 @xl:gap-x-4 ${gridGapYClasses} \
         ${className ?? 'grid-cols-1 @xl:grid-cols-2 @4xl:grid-cols-4'}`
}

/**
 * 親コンテナ
 */
export function GridCardGalleryContent({ children }: PropsWithChildren) {
  return <div className={`@container grid ${gridGapYClasses}`}>{children}</div>
}

/**
 * @usage GridCardGalleryContent > GridCardGalleryFirstView
 */
export function GridCardGalleryFirstView({ className, children }: Props) {
  return <section className={getGridClasses(className)}>{children}</section>
}

/**
 * @usage GridCardGalleryContent > GridCardGalleryMore
 */
export function GridCardGalleryMore({ className, children }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslations('Components.styles')
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleContent className={getGridClasses(className)}>
        {children}
      </CollapsibleContent>
      <CollapsibleTrigger asChild className={`w-full ${isOpen && 'hidden'}`}>
        <Button variant="outline" className="w-full">
          {t('more')}
        </Button>
      </CollapsibleTrigger>
    </Collapsible>
  )
}
