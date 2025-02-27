import { useTranslations } from 'next-intl'
import LocalNavigation from 'components/local-navigation/LocalNavigation'
import { GroupString } from 'config/constants/Group'

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
        { name: t('overview.nav'), pathname: basePath, prefetch: true },
        {
          name: t('talents.nav'),
          pathname: `${basePath}/charts/channels`,
          prefetch: true
        },
        { name: t('live.nav'), pathname: `${basePath}/live`, prefetch: true },
        {
          name: t('scheduled.nav'),
          pathname: `${basePath}/scheduled`,
          prefetch: true
        },
        { name: t('ended.nav'), pathname: `${basePath}/ended` }
      ]}
      className="mb-6"
    />
  )
}
