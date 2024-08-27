'use client'

import React, { PropsWithChildren, useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

type Props = {
  title: string
  children: React.ReactNode
}

export default function Collapsible({
  title,
  children
}: PropsWithChildren<Props>) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleCollapsible = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="rounded">
      <button
        className="flex justify-between items-center w-full p-4 text-left hover:bg-accent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={toggleCollapsible}
        aria-expanded={isOpen}
        aria-controls="content"
      >
        <span className="text-muted-foreground text-lg font-semibold">
          {title}
        </span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </button>
      <div
        id="content"
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4">
          <p className="text-muted-foreground leading-relaxed">{children}</p>
        </div>
      </div>
    </div>
  )
}
