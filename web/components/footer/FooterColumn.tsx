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
}

export function FooterColumn({ title, links }: FooterColumnProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex flex-col">
      {/* PC: 常に表示されるタイトル / スマホ: アコーディオントリガー */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex w-full items-center justify-between text-left',
          'md:cursor-default md:pointer-events-none'
        )}
        aria-expanded={isOpen}
        aria-controls={`footer-${title}`}
      >
        <h3 className="text-sm text-foreground">{title}</h3>
        {/* スマホのみ表示されるシェブロンアイコン */}
        <ChevronDown
          className={cn(
            'h-4 w-4 text-muted-foreground transition-transform duration-200 md:hidden',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {/*
        リンクリスト
        - PC (md以上): 常に表示 (grid)
        - スマホ: CSS制御で表示/非表示 (DOMには常に残す)
      */}
      <ul
        id={`footer-${title}`}
        className={cn(
          'mt-3 grid grid-cols-2 gap-x-4 gap-y-3',
          // md以上: 1列表示
          'md:grid-cols-1',
          // スマホ: isOpenの場合のみ表示（CSSのみ、DOMには残る）
          isOpen ? 'grid' : 'hidden md:grid'
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
                prefetch={false}
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
