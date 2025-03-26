'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { getChannelForAdd } from 'apis/youtube/data-api/getChannelForAdd'
import HowToCheckChannelIdPopover from './HowToCheckChannelIdPopover'

// チャンネルIDのバリデーションスキーマを更新
const formSchema = z.object({
  channelId: z
    .string()
    .min(1, { message: 'チャンネルIDを入力してください' })
    .regex(/^UC[a-zA-Z0-9_-]{22}$/, {
      message:
        '有効なYouTubeチャンネルID（UCから始まる24桁の英数字）を入力してください'
    }),
  country: z.string().min(1, { message: '国を選択してください' }),
  language: z.string().min(1, { message: '言語を選択してください' }),
  gender: z.enum(['male', 'female'], {
    required_error: '性別を選択してください'
  }),
  agency: z.string().min(1, { message: '所属事務所を選択してください' })
})

// チャンネル情報の型定義を更新
type ChannelInfo = {
  title: string
  thumbnail: string
  subscriberCount: number
  recentLiveStreams: number
  meetsSubscriberRequirement: boolean
  meetsLiveStreamRequirement: boolean
} | null

// 国と言語の表示名マッピング
const countryNames: Record<string, string> = {
  japan: '日本',
  usa: 'アメリカ',
  korea: '韓国',
  china: '中国',
  other: 'その他'
}

const languageNames: Record<string, string> = {
  japanese: '日本語',
  english: '英語',
  korean: '韓国語',
  chinese: '中国語',
  other: 'その他'
}

const agencyNames: Record<string, string> = {
  hololive: 'ホロライブ',
  nijisanji: 'にじさんじ',
  vshojo: 'VShojo',
  independent: '個人/独立',
  other: 'その他'
}

export function RegistrationForm() {
  const [channelInfo, setChannelInfo] = useState<ChannelInfo>(null)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      channelId: '',
      country: 'japan',
      language: 'japanese',
      gender: 'female',
      agency: ''
    }
  })

  async function handleChannelIdChange(value: string) {
    // UCから始まる24桁の英数字かどうかをチェック
    if (value.match(/^UC[a-zA-Z0-9_-]{22}$/)) {
      setIsLoading(true)
      setChannelInfo(null)
      try {
        const info = await getChannelForAdd(value)
        setChannelInfo(info)
      } catch (error) {
        console.error('Error fetching channel info:', error)
        toast.error('エラー', {
          description:
            'チャンネル情報の取得に失敗しました。チャンネルIDを確認してください。'
        })
        setChannelInfo(null)
      } finally {
        setIsLoading(false)
      }
    } else {
      setChannelInfo(null)
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // チャンネルの条件を満たしているか確認
    if (channelInfo) {
      const meetsAllRequirements =
        channelInfo.meetsSubscriberRequirement &&
        channelInfo.meetsLiveStreamRequirement

      if (!meetsAllRequirements) {
        toast.error('申請条件を満たしていません', {
          description:
            'チャンネル登録者数が1000人以上で、直近30日間に4回以上のライブ配信が必要です。'
        })
        return
      }
    }

    // 実際のアプリケーションではここでデータを保存する処理を実装
    toast('申請が送信されました', {
      description: `チャンネルID: ${values.channelId}`
    })

    // 履歴に追加する処理（実際のアプリケーションではデータベースに保存）
    const newApplication = {
      id: Math.random().toString(36).substring(2, 9),
      channelId: values.channelId,
      channelTitle: channelInfo?.title || '不明なチャンネル',
      // 新しいフィールドを追加
      country: values.country,
      countryName: countryNames[values.country] || values.country,
      language: values.language,
      languageName: languageNames[values.language] || values.language,
      gender: values.gender,
      genderName: values.gender === 'male' ? '男性' : '女性',
      agency: values.agency,
      agencyName: agencyNames[values.agency] || values.agency,
      subscriberCount: channelInfo?.subscriberCount || 0,
      recentLiveStreams: channelInfo?.recentLiveStreams || 0,
      timestamp: new Date().toISOString(),
      status: 'pending'
    }

    // ローカルストレージに保存（デモ用）
    const history = JSON.parse(
      localStorage.getItem('applicationHistory') || '[]'
    )
    localStorage.setItem(
      'applicationHistory',
      JSON.stringify([newApplication, ...history])
    )

    // 履歴リストを更新するためにページをリロード
    window.location.reload()
  }

  // 数値を日本語の表記に整形する関数
  function formatNumber(num: number): string {
    return new Intl.NumberFormat('ja-JP').format(num)
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="channelId"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <FormLabel>YouTubeチャンネルID</FormLabel>
                    {/* Popoverを独立した要素として配置 */}
                    <HowToCheckChannelIdPopover />
                  </div>
                  <FormControl>
                    <Input
                      placeholder="UCから始まる24桁の英数字"
                      {...field}
                      onChange={e => {
                        field.onChange(e)
                        handleChannelIdChange(e.target.value)
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    YouTubeチャンネルのIDを入力してください（UCから始まる24桁の英数字）
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {isLoading && (
              <div className="flex items-center space-x-4 p-4 border rounded-md">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            )}

            {!isLoading && channelInfo && (
              <div className="border rounded-md overflow-hidden">
                <div className="flex items-center space-x-4 p-4">
                  <img
                    src={channelInfo.thumbnail || '/placeholder.svg'}
                    alt={channelInfo.title}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-medium">{channelInfo.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      チャンネル情報を確認しました
                    </p>
                  </div>
                </div>

                <div className="border-t bg-muted/20 p-4 space-y-3">
                  <h4 className="text-sm font-medium">申請条件</h4>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {channelInfo.meetsSubscriberRequirement ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      )}
                      <span className="text-sm">
                        チャンネル登録者数:{' '}
                        {channelInfo.subscriberCount.toLocaleString()}人
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      1,000人以上必要
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {channelInfo.meetsLiveStreamRequirement ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      )}
                      <span className="text-sm">
                        直近30日間のライブ配信: {channelInfo.recentLiveStreams}
                        回
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      4回以上必要
                    </span>
                  </div>
                </div>
              </div>
            )}

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>国</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="国を選択" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="japan">日本</SelectItem>
                      <SelectItem value="usa">アメリカ</SelectItem>
                      <SelectItem value="korea">韓国</SelectItem>
                      <SelectItem value="china">中国</SelectItem>
                      <SelectItem value="other">その他</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>言語</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="言語を選択" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="japanese">日本語</SelectItem>
                      <SelectItem value="english">英語</SelectItem>
                      <SelectItem value="korean">韓国語</SelectItem>
                      <SelectItem value="chinese">中国語</SelectItem>
                      <SelectItem value="other">その他</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>性別</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="male" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          男性
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="female" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          女性
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="agency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>所属事務所</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="所属事務所を選択" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="hololive">ホロライブ</SelectItem>
                      <SelectItem value="nijisanji">にじさんじ</SelectItem>
                      <SelectItem value="vshojo">VShojo</SelectItem>
                      <SelectItem value="independent">個人/独立</SelectItem>
                      <SelectItem value="other">その他</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={
                isLoading ||
                !channelInfo ||
                !(
                  channelInfo.meetsSubscriberRequirement &&
                  channelInfo.meetsLiveStreamRequirement
                )
              }
            >
              申請する
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
