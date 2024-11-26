import LocalNavigation from 'components/local-navigation/LocalNavigation'
import { GroupString } from 'config/constants/Site'

export default function LocalNavigationForGroupPages({
  group
}: {
  group: GroupString
}) {
  const basePath = `/${group}`

  return (
    <LocalNavigation
      items={[
        { name: '概要', href: basePath },
        { name: 'タレント一覧', href: `${basePath}/charts/channels` },
        { name: '配信中のライブ', href: `${basePath}/live` },
        { name: '配信スケジュール', href: `${basePath}/scheduled` },
        { name: '過去の配信', href: `${basePath}/ended` }
      ]}
      className="mb-4"
    />
  )
}
