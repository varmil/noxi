import { use } from 'react'
import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { IndexTemplate } from 'app/[locale]/(end-user)/(default)/[group]/live/_components/IndexTemplate'
import { Page } from 'components/page'
import { routing } from 'config/i18n/routing'
import LocalNavigationForGroupPages from 'features/group/local-navigation/LocalNavigationForGroupPages'
import { setGroup } from 'lib/server-only-context/cache'

type Props = {
  params: Promise<{
    locale: string
    group: string
  }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale, group } = await props.params
  const tg = await getTranslations({ locale: locale as 'ja' | 'en', namespace: 'Global' })
  const t = await getTranslations({ locale: locale as 'ja' | 'en',
    namespace: 'Page.group.live.metadata'
  })
  const groupName = ((tg as any)(`group.${group}`))

  return {
    title: `${t('title', { group: groupName })} - ${tg('title')}`,
    description: `${t('description', { group: groupName })}`
  }
}

export default function GroupLivePage(props: Props) {
  const { locale, group } = use(props.params)

  // Enable static rendering
  setRequestLocale(locale as 'ja' | 'en')
  setGroup(group)

  const t = useTranslations('Breadcrumb')
  const groupName = t('group', {
    group: ((useTranslations('Global') as any)(`group.${group}`))
  })

  return (
    <Page
      breadcrumb={[
        { href: `/${group}`, name: groupName },
        { href: `/${group}/live`, name: t('live') }
      ]}
      h1={`${groupName} ${t('live')}`}
    >
      <LocalNavigationForGroupPages group={group} />
      <IndexTemplate />
    </Page>
  )
}
