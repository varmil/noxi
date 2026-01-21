import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Page } from 'components/page'
import { GroupRegistrationForm } from './_components/GroupRegistrationForm'
import { GroupRegistrationHistory } from './_components/GroupRegistrationHistory'

export async function generateMetadata(): Promise<Metadata> {
  const [t, tGlobal] = await Promise.all([
    getTranslations('Pages.groupsAdd'),
    getTranslations('Global')
  ])

  return {
    title: `${t('title')} - ${tGlobal('title')}`,
    description: t('description'),
    robots: { index: false }
  }
}

export default async function GroupsAddPage() {
  const t = await getTranslations('Pages.groupsAdd')

  return (
    <Page
      breadcrumb={[{ href: `/groups/add`, name: t('breadcrumb') }]}
      className="mx-auto py-6 space-y-10"
    >
      <h1 className="text-2xl sm:text-3xl font-bold text-center tracking-tight">
        {t('title')}
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <GroupRegistrationForm />
        </div>
        <div className="lg:col-span-1">
          <GroupRegistrationHistory />
        </div>
      </div>
    </Page>
  )
}
