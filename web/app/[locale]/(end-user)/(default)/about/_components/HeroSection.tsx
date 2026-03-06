'use client'

import { ArrowRight, Database, Globe, ShelvingUnit } from 'lucide-react'
import { type LucideIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Separator } from '@/components/ui/separator'
import { Link } from 'lib/navigation'

const VALUE_KEYS = ['openData', 'easy', 'factBased'] as const
const VALUE_ICONS: Record<(typeof VALUE_KEYS)[number], LucideIcon> = {
  openData: Globe,
  factBased: Database,
  easy: ShelvingUnit
}

export default function HeroSection() {
  const t = useTranslations('Pages.about.hero')
  const m = useTranslations('Pages.about.mission')

  return (
    <section className="relative overflow-hidden bg-background py-12 sm:py-24 md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.93 0.01 250 / 0.35) 0%, transparent 70%)'
        }}
      />
      <div className="mx-auto max-w-4xl px-8">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl">
            {t('title')}
          </h1>

          <p className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
            {t('subtitle')}
          </p>

          <Separator className="mt-4 w-16" />
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-3">
          {VALUE_KEYS.map(key => {
            const Icon = VALUE_ICONS[key]
            return (
              <div key={key} className="text-center md:text-left">
                <Icon
                  className="mx-auto mb-4 size-6 md:size-8 text-foreground md:mx-0"
                  strokeWidth={1.5}
                />
                <p className="text-sm leading-relaxed text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    {m(`items.${key}.title`)}.
                  </span>{' '}
                  {m(`items.${key}.description`)}
                </p>
                {key === 'factBased' && (
                  <Link
                    href="/data-methodology-and-disclaimer"
                    className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                    prefetch={false}
                  >
                    {m('methodologyLink')}
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
