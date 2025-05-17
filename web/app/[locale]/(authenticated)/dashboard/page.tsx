import type React from 'react'
import { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { getUserProfile } from 'apis/user-profiles/getUserProfile'
import ProfileForm from 'features/dashboard/profile/components/ProfileForm'
import { auth } from 'lib/auth'
import { redirect } from 'lib/navigation'

type Props = {
  params: Promise<{ locale: Locale }>
  searchParams: Promise<{}>
}

export default async function ProfilePage(props: Props) {
  const session = await auth()
  const locale = (await props.params).locale
  const page = await getTranslations('Page.dashboard.profile')

  if (!session) {
    redirect({ href: '/auth/signin', locale })
    return
  }

  const profile = await getUserProfile(session.user.id)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{page('title')}</CardTitle>
        <CardDescription>{page('description')}</CardDescription>
      </CardHeader>
      <ProfileForm session={session} userProfile={profile} />
    </Card>
  )
}
