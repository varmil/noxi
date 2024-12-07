import { use } from "react";
import { group } from 'console'
import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import GroupGallery from 'components/group/GroupGallery'
import { Page } from 'components/page'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;

  const {
    locale
  } = params;

  const tg = await getTranslations({ locale, namespace: 'Global' })
  const t = await getTranslations({ locale, namespace: 'Page.groups.metadata' })
  return {
    title: `${t('title')} - ${tg('title')}`,
    description: `${t('description')}`
  }
}

export default function GroupsPage(props: Props) {
  const params = use(props.params);

  const {
    locale
  } = params;

  // Enable static rendering
  setRequestLocale(locale)
  const t = useTranslations('Page.groups.metadata')

  return (
    <Page breadcrumb={[{ href: `/groups`, name: t('title') }]}>
      <GroupGallery className="grid w-full px-4 gap-1.5 md:gap-3 md:grid-cols-2 lg:gap-4 lg:grid-cols-3 text-sm lg:text-base" />
    </Page>
  )
}
