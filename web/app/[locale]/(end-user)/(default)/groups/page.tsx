import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getGroups } from 'apis/groups'
import GroupGallery from 'components/group/GroupGallery'
import { Page } from 'components/page'
import { TalentSearch } from 'components/talent-search/components/TalentSearch'
import { getWebUrl } from 'utils/web-url'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const { locale } = params

  const tg = await getTranslations({
    locale: locale as 'ja' | 'en',
    namespace: 'Global'
  })
  const t = await getTranslations({
    locale: locale as 'ja' | 'en',
    namespace: 'Page.groups.metadata'
  })
  return {
    title: `${t('title')} - ${tg('title')}`,
    description: `${t('description')}`,
    alternates: {
      canonical: `${getWebUrl()}/${locale}/groups`
    }
  }
}

export default async function GroupsPage(props: Props) {
  const params = await props.params
  const { locale } = params

  // Enable static rendering
  setRequestLocale(locale as 'ja' | 'en')
  const t = await getTranslations('Page.groups')

  const groups = await getGroups()

  return (
    <Page breadcrumb={[{ href: `/groups`, name: t('metadata.title') }]}>
      <div className="flex flex-col gap-y-12 px-4 pt-8">
        <section className="flex flex-col gap-y-6">
          <h2 className="text-lg font-bold">{t('section.vtuberSearch')}</h2>
          <TalentSearch className="max-w-[500px]" />
        </section>
        <section className="flex flex-col gap-y-4">
          <h2 className="text-lg font-bold">{t('section.groupList')}</h2>
          <GroupGallery
            className="grid w-full gap-1.5 md:gap-3 md:grid-cols-2 lg:gap-4 lg:grid-cols-2 xl:grid-cols-3 text-sm"
            groups={groups}
          />
        </section>
      </div>
    </Page>
  )
}
