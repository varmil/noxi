import type React from 'react'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import ProfileForm from 'app/[locale]/(authenticated)/dashboard/components/ProfileForm'

export default function ProfilePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>プロフィール</CardTitle>
        <CardDescription>
          あなたのプロフィール情報を管理します。他のファンに表示される情報です。
        </CardDescription>
      </CardHeader>
      <ProfileForm />
    </Card>
  )
}
