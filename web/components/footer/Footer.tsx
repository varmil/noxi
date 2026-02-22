/**
 * @important workaround: googlebotがscript内のhrefを拾って404扱いにする問題
 * これを回避するために、use clientをつけてhref部分を露出させないようにする
 */
'use client'

import { useTranslations } from 'next-intl'
import { FooterColumn } from './FooterColumn'

export function Footer() {
  const t = useTranslations('Components.footer')
  const currentYear = new Date().getFullYear()

  const footerData = {
    superChatRanking: {
      title: t('superChatRanking'),
      links: [
        {
          label: t('last24Hours'),
          href: '/ranking/super-chat/channels/all/last24Hours'
        },
        {
          label: t('last30Days'),
          href: '/ranking/super-chat/channels/all/last30Days'
        },
        {
          label: t('thisYear'),
          href: '/ranking/super-chat/channels/all/thisYear'
        },
        {
          label: t('weeklyMonthlyRankings'),
          href: '/ranking/super-chat/channels'
        }
      ]
    },
    viewerRanking: {
      title: t('viewerRanking'),
      links: [
        {
          label: t('realtime'),
          href: '/ranking/concurrent-viewer/live/all/realtime'
        },
        {
          label: t('last30Days'),
          href: '/ranking/concurrent-viewer/live/all/last30Days'
        },
        {
          label: t('thisYear'),
          href: '/ranking/concurrent-viewer/live/all/thisYear'
        },
        {
          label: t('weeklyMonthlyRankings'),
          href: '/ranking/concurrent-viewer/live'
        }
      ]
    },
    subscriberRanking: {
      title: t('subscriberRanking'),
      links: [
        {
          label: t('wholePeriod'),
          href: '/ranking/subscriber/channels/all/wholePeriod'
        }
      ]
    },
    groups: {
      title: t('groups'),
      links: [
        { label: t('nijisanji'), href: '/nijisanji' },
        { label: t('hololive'), href: '/hololive' },
        { label: t('independent'), href: '/independent' },
        { label: t('vspo'), href: '/vspo' },
        { label: t('neoPorte'), href: '/neo-porte' },
        { label: t('allGroups'), href: '/groups' }
      ]
    },
    siteInfo: {
      title: t('siteInfo'),
      links: [
        {
          label: t('xAccount'),
          href: 'https://x.com/VCharts_net',
          external: true
        },
        {
          label: t('termsAndPrivacy'),
          href: '/terms-of-use-and-privacy-policy'
        },
        {
          label: t('dataMethodology'),
          href: '/data-methodology-and-disclaimer'
        },
        { label: t('tokushoho'), href: '/legal/tokushoho' },
        { label: t('emailAlias'), href: '/help/email-alias' }
      ]
    }
  }

  return (
    <footer className="border-t border-border bg-muted/30 mt-0">
      <div className="mx-auto max-w-[1200px] pt-6 pb-3 px-4 sm:px-6 lg:px-8">
        {/* SEO-friendly nav with proper structure */}
        <nav aria-label={t('navigation')}>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-6">
            {/* カラム1: スパチャランキング */}
            <FooterColumn
              title={footerData.superChatRanking.title}
              links={footerData.superChatRanking.links}
            />

            {/* カラム2: 同接数ランキング */}
            <FooterColumn
              title={footerData.viewerRanking.title}
              links={footerData.viewerRanking.links}
            />

            {/* カラム3: チャンネル登録者数 */}
            <FooterColumn
              title={footerData.subscriberRanking.title}
              links={footerData.subscriberRanking.links}
            />

            {/* カラム4: 主要グループ */}
            <FooterColumn
              title={footerData.groups.title}
              links={footerData.groups.links}
            />

            {/* カラム5: サイト情報 */}
            <FooterColumn
              title={footerData.siteInfo.title}
              links={footerData.siteInfo.links}
            />
          </div>
        </nav>

        {/* コピーライト */}
        <div className="mt-6 border-t border-border pt-3">
          <p className="text-center text-xs text-muted-foreground">
            {t('copyright', { year: currentYear })}
          </p>
        </div>
      </div>
    </footer>
  )
}
