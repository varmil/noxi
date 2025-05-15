import type React from 'react'
import { Locale } from 'next-intl'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { getUserProfile } from 'apis/user-profiles/getUserProfile'
import { auth } from 'lib/auth'
import { redirect } from 'lib/navigation'
import ProfileForm from './components/ProfileForm'

type Props = {
  params: Promise<{ locale: Locale }>
  searchParams: Promise<{}>
}

export default async function ProfilePage(props: Props) {
  const session = await auth()
  const locale = (await props.params).locale
  if (!session) {
    redirect({ href: '/auth/signin', locale })
    return
  }

  const profile = await getUserProfile(session.user.id)

  return (
    <Card>
      <CardHeader>
        <CardTitle>プロフィール</CardTitle>
        <CardDescription>
          あなたのプロフィール情報を管理します。他のファンに表示される情報です。
        </CardDescription>
      </CardHeader>
      <ProfileForm session={session} userProfile={profile} />
    </Card>
  )
}
