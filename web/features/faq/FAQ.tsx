'use client'

import React, { useState, PropsWithoutRef } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'
import type { FAQ } from 'features/faq/types/FAQs'

type Props = FAQ

export default function FAQ({ question, answer }: PropsWithoutRef<Props>) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mb-4">
        <div
          itemScope
          itemProp="mainEntity"
          itemType="https://schema.org/Question"
        >
          <CollapsibleTrigger className="flex justify-between items-center w-full p-4 bg-muted hover:bg-primary/70 rounded-md">
            <h3 itemProp="name" className="font-semibold">
              {question}
            </h3>
            {isOpen ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent
            className={`p-4 ${isOpen ? '' : 'hidden'}`}
            forceMount
          >
            <div
              itemScope
              itemProp="acceptedAnswer"
              itemType="https://schema.org/Answer"
            >
              <div itemProp="text">{answer}</div>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </>
  )
}
