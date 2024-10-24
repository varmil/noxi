import { use } from "react";
import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { Page } from 'components/page'
import { GroupString, GroupStrings } from 'config/constants/Site'
import { setGroup } from 'lib/server-only-context/cache'
import { IndexTemplate } from './_components/IndexTemplate'

type Props = {
  params: Promise<{ locale: string; group: GroupString }>
  searchParams?: ConstructorParameters<typeof URLSearchParams>[0]
}

/**
 * The Root of the Group Page
 */
export function generateStaticParams(): { group: string }[] {
  return GroupStrings.map(group => ({ group }))
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;

  const {
    locale,
    group
  } = params;

  const tg = await getTranslations({ locale, namespace: 'Global' })
  const t = await getTranslations({
    locale,
    namespace: 'Page.group.index.metadata'
  })
  const groupName = tg(`group.${group}`)

  return {
    title: `${t('title', { group: groupName })} - ${tg('title')}`,
    description: `${t('description', { group: groupName })}`
  }
}

export default function HololivePage(props: Props) {
  const params = use(props.params);

  const {
    locale,
    group
  } = params;

  // Enable static rendering
  unstable_setRequestLocale(locale)
  setGroup(group)

  const tg = useTranslations('Global')
  const t = useTranslations('Breadcrumb')

  return (
    <Page
      breadcrumb={[
        { href: `/${group}`, name: t('group', { group: tg(`group.${group}`) }) }
      ]}
    >
      <IndexTemplate />
    </Page>
  )
}
