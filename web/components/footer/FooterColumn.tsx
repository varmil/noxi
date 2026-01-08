'use client'

import { useState } from 'react'
import { ChevronDown, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Link } from 'lib/navigation'

interface FooterLink {
  label: string
  href: string
  external?: boolean
}

interface FooterColumnProps {
  title: string
  links: FooterLink[]
  defaultOpen?: boolean
  alwaysOpen?: boolean
}

export function FooterColumn({
  title,
  links,
  defaultOpen = false,
  alwaysOpen = false
}: FooterColumnProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="flex flex-col">
      {/* PC: 常に表示されるタイトル / スマホ: アコーディオントリガー */}
      <button
        type="button"
        onClick={() => !alwaysOpen && setIsOpen(!isOpen)}
        className={cn(
          'flex w-full items-center justify-between text-left',
          'md:cursor-default md:pointer-events-none'
        )}
        aria-expanded={isOpen}
        aria-controls={`footer-${title}`}
      >
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        {/* スマホのみ表示されるシェブロンアイコン（alwaysOpenの場合は非表示） */}
        {!alwaysOpen && (
          <ChevronDown
            className={cn(
              'h-4 w-4 text-muted-foreground transition-transform duration-200 md:hidden',
              isOpen && 'rotate-180'
            )}
          />
        )}
      </button>

      {/*
        リンクリスト
        - PC (md以上): 常に表示 (grid)
        - スマホ: CSS制御で表示/非表示 (DOMには常に残す)
        - alwaysOpen: スマホでも常に表示
      */}
      <ul
        id={`footer-${title}`}
        className={cn(
          'mt-4 space-y-2',
          // PC: 常に表示
          'md:block',
          // スマホ: isOpenまたはalwaysOpenの場合のみ表示（CSSのみ、DOMには残る）
          alwaysOpen ? 'block' : isOpen ? 'block' : 'hidden md:block'
        )}
      >
        {links.map(link => (
          <li key={link.href}>
            {link.external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
                <ExternalLink className="h-3 w-3" />
              </a>
            ) : (
              <Link
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
