import { group } from 'console'
import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import GroupGallery from 'components/group/GroupGallery'
import { Page } from 'components/page'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({
  params: { locale }
}: Props): Promise<Metadata> {
  const tg = await getTranslations({ locale, namespace: 'Global' })
  const t = await getTranslations({ locale, namespace: 'Page.groups.metadata' })
  return {
    title: `${t('title')} - ${tg('title')}`,
    description: `${t('description')}`
  }
}

export default function GroupsPage({ params: { locale } }: Props) {
  // Enable static rendering
  setRequestLocale(locale)
  const t = useTranslations('Page.groups.metadata')

  return (
    <Page breadcrumb={[{ href: `/groups`, name: t('title') }]}>
      <GroupGallery className="pl-8" />
    </Page>
  )
}
