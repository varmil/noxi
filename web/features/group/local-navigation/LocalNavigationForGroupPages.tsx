import { useTranslations } from 'next-intl'
import LocalNavigation from 'components/local-navigation/LocalNavigation'
import { GroupString } from 'config/constants/Site'

export default function LocalNavigationForGroupPages({
  group
}: {
  group: GroupString
}) {
  const t = useTranslations('Features.group')
  const basePath = `/${group}`

  return (
    <LocalNavigation
      items={[
        { name: t('overview.nav'), href: basePath, prefetch: true },
        {
          name: t('talents.nav'),
          href: `${basePath}/charts/channels`,
          prefetch: true
        },
        { name: t('live.nav'), href: `${basePath}/live`, prefetch: true },
        { name: t('scheduled.nav'), href: `${basePath}/scheduled` },
        { name: t('ended.nav'), href: `${basePath}/ended` }
      ]}
      className="mb-4"
    />
  )
}
