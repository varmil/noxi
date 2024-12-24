import { use } from 'react'
import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { IndexTemplate } from 'app/[locale]/(end-user)/(default)/[group]/scheduled/_components/IndexTemplate'
import { Page } from 'components/page'
import { GroupString } from 'config/constants/Site'
import LocalNavigationForGroupPages from 'features/group/local-navigation/LocalNavigationForGroupPages'
import { setGroup } from 'lib/server-only-context/cache'

type Props = {
  params: Promise<{ locale: string; group: GroupString }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale, group } = await props.params
  const tg = await getTranslations({ locale, namespace: 'Global' })
  const t = await getTranslations({
    locale,
    namespace: 'Page.group.scheduled.metadata'
  })
  const groupName = tg(`group.${group}`)

  return {
    title: `${t('title', { group: groupName })} - ${tg('title')}`,
    description: `${t('description', { group: groupName })}`
  }
}

export default function HololiveScheduledPage(props: Props) {
  const { locale, group } = use(props.params)

  // Enable static rendering
  setRequestLocale(locale)
  setGroup(group)

  const t = useTranslations('Breadcrumb')
  const groupName = t('group', {
    group: useTranslations('Global')(`group.${group}`)
  })

  return (
    <Page
      breadcrumb={[
        {
          href: `/groups`,
          name: useTranslations('Page.groups.metadata')('title')
        },
        { href: `/${group}`, name: groupName },
        { href: `/${group}/scheduled`, name: t('scheduled') }
      ]}
      h1={`${groupName} ${t('scheduled')}`}
    >
      <LocalNavigationForGroupPages group={group} />
      <IndexTemplate />
    </Page>
  )
}
