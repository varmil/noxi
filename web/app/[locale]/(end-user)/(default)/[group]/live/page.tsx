import { use } from "react";
import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { IndexTemplate } from 'app/[locale]/(end-user)/(default)/[group]/live/_components/IndexTemplate'
import { Page } from 'components/page'
import { GroupString } from 'config/constants/Site'
import LocalNavigationForGroupPages from 'features/group/local-navigation/LocalNavigationForGroupPages'
import { setGroup } from 'lib/server-only-context/cache'

type Props = {
  params: Promise<{ locale: string; group: GroupString }>
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
    namespace: 'Page.group.live.metadata'
  })
  const groupName = tg(`group.${group}`)

  return {
    title: `${t('title', { group: groupName })} - ${tg('title')}`,
    description: `${t('description', { group: groupName })}`
  }
}

export default function GroupLivePage(props: Props) {
  const params = use(props.params);

  const {
    locale,
    group
  } = params;

  // Enable static rendering
  setRequestLocale(locale)
  setGroup(group)

  const tg = useTranslations('Global')
  const t = useTranslations('Breadcrumb')

  return (
    <Page
      breadcrumb={[
        {
          href: `/groups`,
          name: useTranslations('Page.groups.metadata')('title')
        },
        {
          href: `/${group}`,
          name: t('group', { group: tg(`group.${group}`) })
        },
        { href: `/${group}/live`, name: t('live') }
      ]}
    >
      <LocalNavigationForGroupPages group={group} />
      <IndexTemplate />
    </Page>
  )
}
