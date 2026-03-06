'use client'

import {
  GraduationCap,
  Briefcase,
  BarChart3,
  ExternalLink,
  MapPin
} from 'lucide-react'
import { type LucideIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import XIcon from 'components/icons/XIcon'
import Image from 'components/styles/Image'

const EXPERIENCE_KEYS = ['vcharts', 'commune', 'cygames'] as const
const EXPERIENCE_ICONS: Record<(typeof EXPERIENCE_KEYS)[number], LucideIcon> = {
  cygames: Briefcase,
  commune: Briefcase,
  vcharts: BarChart3
}

const SOCIAL_LINKS = [
  {
    key: 'personalX',
    href: 'https://x.com/ay_at_commmune',
    icon: 'x' as const
  },
  {
    key: 'personalLinkedIn',
    href: 'https://jp.linkedin.com/in/%E6%99%83%E5%A4%A7-%E5%B1%B1%E6%9C%AC-029aa4251',
    icon: 'external' as const
  },
  {
    key: 'personalFacebook',
    href: 'https://www.facebook.com/akihiro.yamamoto.330/',
    icon: 'external' as const
  }
] as const

export default function OperatorSection() {
  const t = useTranslations('Pages.about.operator')

  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="mb-12 text-center text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {t('title')}
        </h2>

        <div className="flex flex-col items-start gap-10 sm:flex-row">
          {/* Avatar */}
          <div className="flex w-full flex-shrink-0 justify-center sm:w-auto">
            <div className="h-28 w-28 overflow-hidden rounded-full border-2 border-border shadow-sm">
              <Image
                src="/images/about/profile-avatar.png"
                alt={t('name')}
                width={112}
                height={112}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex flex-wrap items-center gap-3">
              <h3 className="text-xl font-semibold text-foreground">
                {t('name')}
              </h3>
              <Badge variant="secondary" className="text-xs">
                {t('role')}
              </Badge>
            </div>

            <div className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              <span>{t('from')}</span>
            </div>

            <p className="mb-6 max-w-prose text-sm leading-relaxed text-muted-foreground">
              {t('bio')}
            </p>

            <Separator className="mb-6" />

            {/* Experience */}
            <h4 className="mb-4 text-sm font-semibold text-foreground">
              {t('experience.title')}
            </h4>

            <ol aria-label="Career timeline" className="space-y-4">
              {EXPERIENCE_KEYS.map(key => {
                const Icon = EXPERIENCE_ICONS[key]
                const isCurrent = key === 'vcharts'
                return (
                  <li key={key} className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md ${
                        isCurrent
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      <Icon className="h-4 w-4" strokeWidth={1.5} />
                    </span>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">
                        {t(`experience.items.${key}`)}
                      </span>
                    </div>
                  </li>
                )
              })}

              {/* Education */}
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                  <GraduationCap className="h-4 w-4" strokeWidth={1.5} />
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">
                    {t('education')}
                  </span>
                </div>
              </li>
            </ol>

            <Separator className="my-6" />

            {/* Social links */}
            <nav
              aria-label="Personal social links"
              className="flex flex-wrap items-center gap-3"
            >
              {SOCIAL_LINKS.map(({ key, href, icon }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  {icon === 'x' ? <XIcon className="h-3 w-3" /> : null}
                  {t(`socialLinks.${key}`)}
                  <ExternalLink className="h-3 w-3" />
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </section>
  )
}
