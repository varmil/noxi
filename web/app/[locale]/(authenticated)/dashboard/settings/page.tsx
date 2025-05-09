'use client'

import type React from 'react'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false)

  // 設定のモックデータ
  const [settings, setSettings] = useState({
    emailNotifications: true,
    newCommentNotifications: true,
    newFollowerNotifications: false,
    marketingEmails: false,
    publicProfile: true
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // 設定更新のシミュレーション
    await new Promise(resolve => setTimeout(resolve, 1000))

    setIsLoading(false)
    toast('設定を更新しました', {
      description: '変更内容が保存されました。'
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>設定</CardTitle>
        <CardDescription>
          通知設定やプライバシー設定を管理します。
        </CardDescription>
      </CardHeader>
      <form className="contents" onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">通知設定</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="email-notifications"
                  className="flex items-start flex-col"
                >
                  <span>メール通知</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    重要なお知らせをメールで受け取る
                  </span>
                </Label>
                <Switch
                  id="email-notifications"
                  checked={settings.emailNotifications}
                  onCheckedChange={checked =>
                    setSettings({ ...settings, emailNotifications: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="new-comment-notifications"
                  className="flex items-start flex-col"
                >
                  <span>新しいコメント</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    あなたのコメントに返信があった場合に通知
                  </span>
                </Label>
                <Switch
                  id="new-comment-notifications"
                  checked={settings.newCommentNotifications}
                  onCheckedChange={checked =>
                    setSettings({
                      ...settings,
                      newCommentNotifications: checked
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="new-follower-notifications"
                  className="flex items-start flex-col"
                >
                  <span>新しいフォロワー</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    新しいフォロワーがあった場合に通知
                  </span>
                </Label>
                <Switch
                  id="new-follower-notifications"
                  checked={settings.newFollowerNotifications}
                  onCheckedChange={checked =>
                    setSettings({
                      ...settings,
                      newFollowerNotifications: checked
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="marketing-emails"
                  className="flex items-start flex-col"
                >
                  <span>マーケティングメール</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    新機能やプロモーションのお知らせを受け取る
                  </span>
                </Label>
                <Switch
                  id="marketing-emails"
                  checked={settings.marketingEmails}
                  onCheckedChange={checked =>
                    setSettings({ ...settings, marketingEmails: checked })
                  }
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">プライバシー設定</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="public-profile"
                  className="flex items-start flex-col"
                >
                  <span>公開プロフィール</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    他のユーザーにプロフィールを表示する
                  </span>
                </Label>
                <Switch
                  id="public-profile"
                  checked={settings.publicProfile}
                  onCheckedChange={checked =>
                    setSettings({ ...settings, publicProfile: checked })
                  }
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="mt-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                保存中...
              </>
            ) : (
              '設定を保存'
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
