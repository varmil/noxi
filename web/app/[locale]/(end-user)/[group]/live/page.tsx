import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { IndexTemplate } from 'app/[locale]/(end-user)/[group]/live/_components/IndexTemplate'
import { Page } from 'components/page'
import { GroupString } from 'config/constants/Site'
import { setGroup } from 'lib/server-only-context/cache'

type Props = {
  params: { locale: string; group: GroupString }
}

export async function generateMetadata({
  params: { locale, group }
}: Props): Promise<Metadata> {
  const tg = await getTranslations({ locale, namespace: 'Global' })
  const t = await getTranslations({
    locale,
    namespace: 'Page.group.live.metadata'
  })

  return {
    title: `${t('title', { group: tg(`group.${group}`) })} | ${tg('title')}`,
    description: `${t('description', { group: tg(`group.${group}`) })}`
  }
}

export default function GroupLivePage({ params: { locale, group } }: Props) {
  // Enable static rendering
  unstable_setRequestLocale(locale)
  setGroup(group)

  const tg = useTranslations('Global')
  const t = useTranslations('Breadcrumb')

  return (
    <Page
      breadcrumb={[
        {
          href: `/${group}`,
          name: t('group', { group: tg(`group.${group}`) })
        },
        { href: `/${group}/live`, name: t('live') }
      ]}
    >
      <IndexTemplate />
    </Page>
  )
}
