import { use } from 'react'
import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Page } from 'components/page'
import { GroupString } from 'config/constants/Group'
import LocalNavigationForGroupPages from 'features/group/local-navigation/LocalNavigationForGroupPages'
import { StreamGallerySearchParams } from 'features/group/types/stream-gallery'
import { setGroup } from 'lib/server-only-context/cache'
import { IndexTemplate } from './_components/IndexTemplate'

type Props = {
  params: Promise<{ locale: string; group: GroupString }>
  searchParams: Promise<StreamGallerySearchParams>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale, group } = await props.params
  const tg = await getTranslations({ locale, namespace: 'Global' })
  const t = await getTranslations({
    locale,
    namespace: 'Page.group.ended.metadata'
  })
  const groupName = tg(`group.${group}`)

  return {
    title: `${t('title', { group: groupName })} - ${tg('title')}`,
    description: `${t('description', { group: groupName })}`
  }
}

export default function GroupEndedPage(props: Props) {
  const { locale, group } = use(props.params)
  const searchParams = use(props.searchParams)

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
        { href: `/${group}/ended`, name: t('ended') }
      ]}
      h1={`${groupName} ${t('ended')}`}
    >
      <LocalNavigationForGroupPages group={group} />
      <IndexTemplate searchParams={searchParams} />
    </Page>
  )
}
