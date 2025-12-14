import type React from 'react'
import { getTranslations } from 'next-intl/server'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { getUserProfile } from 'apis/user-profiles/getUserProfile'
import { routing } from 'config/i18n/routing'
import ProfileForm from 'features/dashboard/profile/components/ProfileForm'
import { auth } from 'lib/auth'
import { Link, redirect } from 'lib/navigation'
import { getWebUrl } from 'utils/web-url'

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{}>
}

export default async function ProfilePage(props: Props) {
  const session = await auth()
  const locale = (await props.params).locale
  const page = await getTranslations('Page.dashboard')

  if (!session) {
    redirect({ href: '/auth/signin', locale: locale as 'ja' | 'en' })
    return
  }

  const profile = await getUserProfile(session.user.id)

  return (
    <section className="flex flex-col items-center justify-center gap-y-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{page('profile.title')}</CardTitle>
          <CardDescription>{page('profile.description')}</CardDescription>
        </CardHeader>
        <ProfileForm session={session} userProfile={profile} />
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>{page('mypage.title')}</CardTitle>
          <CardDescription>{page('mypage.description')}</CardDescription>
        </CardHeader>
        <CardContent className="text-sm">
          <Link
            className="underline underline-offset-2 text-blue-700 dark:text-blue-400"
            href={`/users/${profile?.username}`}
            prefetch={false}
          >
            {getWebUrl()}/users/{profile?.username}
          </Link>
        </CardContent>
      </Card>
    </section>
  )
}
