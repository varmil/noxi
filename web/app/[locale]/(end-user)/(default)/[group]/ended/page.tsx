import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getGroupName } from 'apis/groups'
import { Page } from 'components/page'
import LocalNavigationForGroupPages from 'features/group/local-navigation/LocalNavigationForGroupPages'
import { StreamGallerySearchParams } from 'features/group/types/stream-gallery'
import { setGroup } from 'lib/server-only-context/cache'
import { getAlternates } from 'utils/metadata/getAlternates'
import { IndexTemplate } from './_components/IndexTemplate'

type Props = {
  params: Promise<{
    locale: string
    group: string
  }>
  searchParams: Promise<StreamGallerySearchParams>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale, group: groupId } = await props.params
  const [tg, t, groupName] = await Promise.all([
    getTranslations({ locale: locale as 'ja' | 'en', namespace: 'Global' }),
    getTranslations({
      locale: locale as 'ja' | 'en',
      namespace: 'Page.group.ended.metadata'
    }),
    getGroupName(groupId, { errorContext: 'ended page (metadata)' })
  ])

  return {
    title: `${t('title', { group: groupName })} - ${tg('title')}`,
    description: `${t('description', { group: groupName })}`,
    alternates: getAlternates({ pathname: `/${groupId}/ended`, locale })
  }
}

export default async function GroupEndedPage(props: Props) {
  const { locale, group: groupId } = await props.params
  const searchParams = await props.searchParams

  // Enable static rendering
  setRequestLocale(locale as 'ja' | 'en')
  setGroup(groupId)

  const [t, groupName] = await Promise.all([
    getTranslations('Breadcrumb'),
    getGroupName(groupId, { errorContext: 'ended page' })
  ])

  return (
    <Page
      breadcrumb={[
        { href: `/${groupId}`, name: groupName },
        { href: `/${groupId}/ended`, name: t('ended') }
      ]}
      h1={`${groupName} ${t('ended')}`}
    >
      <LocalNavigationForGroupPages group={groupId} />
      <IndexTemplate searchParams={searchParams} />
    </Page>
  )
}
