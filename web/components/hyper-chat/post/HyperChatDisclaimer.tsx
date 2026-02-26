'use client'

import { Globe, HandCoins, Wrench } from 'lucide-react'
import { useTranslations } from 'next-intl'

export function HyperChatDisclaimer() {
  const t = useTranslations('Features.hyperChat.dialog.disclaimer')

  return (
    <div className="rounded-lg bg-blue-50/50 dark:bg-blue-950/20 px-4 py-3 space-y-3">
      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-4">
        <span>{t('title')}</span>
      </div>

      <div className="space-y-3">
        <div className="flex gap-3">
          <div className="mt-0.5 shrink-0">
            <HandCoins className="size-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-foreground">
              {t('noReturn.heading')}
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t('noReturn.body')}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="mt-0.5 shrink-0">
            <Globe className="size-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-foreground">
              {t('spreadOshi.heading')}
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t('spreadOshi.body')}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="mt-0.5 shrink-0">
            <Wrench className="size-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-foreground">
              {t('funding.heading')}
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t('funding.body')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
