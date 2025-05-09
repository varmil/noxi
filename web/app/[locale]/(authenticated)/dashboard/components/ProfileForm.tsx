'use client'

import type React from 'react'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function ProfileForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [profile, setProfile] = useState({
    username: 'ユーザー123',
    bio: 'PeakXでVTuberを応援しています！',
    avatarUrl: '/placeholder.svg?height=100&width=100'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // プロフィール更新のシミュレーション
    await new Promise(resolve => setTimeout(resolve, 1000))

    setIsLoading(false)
    toast('プロフィールを更新しました', {
      description: '変更内容が保存されました。'
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // 実際の実装ではファイルアップロード処理を行う
      const reader = new FileReader()
      reader.onload = event => {
        if (event.target?.result) {
          setProfile({
            ...profile,
            avatarUrl: event.target.result as string
          })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <form className="contents" onSubmit={handleSubmit}>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-24 w-24">
            <AvatarImage
              src={profile.avatarUrl || '/placeholder.svg'}
              alt={profile.username}
            />
            <AvatarFallback>{profile.username.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-2">
            <Label
              htmlFor="avatar"
              className="cursor-pointer bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/80"
            >
              画像を変更
            </Label>
            <Input
              id="avatar"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="username">表示名</Label>
          <Input
            id="username"
            value={profile.username}
            onChange={e => setProfile({ ...profile, username: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bio">自己紹介</Label>
          <Textarea
            id="bio"
            value={profile.bio}
            onChange={e => setProfile({ ...profile, bio: e.target.value })}
            rows={4}
          />
          <p className="text-xs text-muted-foreground">
            最大200文字まで入力できます。現在: {profile.bio.length}文字
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              保存中...
            </>
          ) : (
            '変更を保存'
          )}
        </Button>
      </CardFooter>
    </form>
  )
}
