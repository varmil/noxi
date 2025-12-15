import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getChannels } from 'apis/youtube/getChannels'
import GroupGallery from 'components/group/GroupGallery'
import { Page } from 'components/page'
import { TalentSearch } from 'components/talent-search/components/TalentSearch'

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
    description: `${t('description')}`
  }
}

export default async function GroupsPage(props: Props) {
  const params = await props.params
  const { locale } = params

  // Enable static rendering
  setRequestLocale(locale as 'ja' | 'en')
  const t = await getTranslations('Page.groups.metadata')

  // 適当におすすめをとる
  const channels = await getChannels({
    group: 'nijisanji',
    limit: 3
  })

  return (
    <Page breadcrumb={[{ href: `/groups`, name: t('title') }]}>
      <section className="flex flex-col gap-y-6 px-4 pt-4">
        <TalentSearch suggestions={channels} />
        <GroupGallery className="grid w-full gap-1.5 md:gap-3 md:grid-cols-2 lg:gap-4 lg:grid-cols-2 text-sm" />
      </section>
    </Page>
  )
}
