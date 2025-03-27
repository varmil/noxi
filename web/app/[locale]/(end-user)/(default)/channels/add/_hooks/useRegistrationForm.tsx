import { useCallback, useMemo, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { getChannelForAdd } from 'apis/youtube/data-api/getChannelForAdd'
import { ChannelInfo } from 'apis/youtube/data-api/getChannelForAdd'
import { existsChannel } from 'apis/youtube/getChannel'

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
  group: z.string().min(1, { message: '所属事務所を選択してください' })
})

export function useRegistrationForm() {
  const [channelInfo, setChannelInfo] = useState<ChannelInfo | null>(null)
  /** チャンネル情報をData APIから取得中 */
  const [isLoading, setIsLoading] = useState(false)
  /** すでにPeakXに当該チャンネルが登録されている */
  const [isRegistered, setIsRegistered] = useState(false)
  /** 当該チャンネルが却下済み && 1ヶ月以上経過していない */
  const [isRejected, setIsRejected] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      channelId: '',
      country: 'JP',
      language: 'ja',
      gender: 'female',
      group: ''
    }
  })

  const handleChannelIdChange = useCallback(async (value: string) => {
    // UCから始まる24桁の英数字かどうかをチェック
    if (value.match(/^UC[a-zA-Z0-9_-]{22}$/)) {
      setIsLoading(true)
      setChannelInfo(null)

      // TODO: 却下済みのチャンネルの判定
      // サーバーから ChannelRegistration.status を取得する
      // status === 'rejected' かつ appliedAt が 1ヶ月以上経過していない場合、
      // isRejected を true にする
      try {
        const [info, exists] = await Promise.all([
          getChannelForAdd(value),
          existsChannel(value)
        ])
        setChannelInfo(info)
        setIsRegistered(exists)
        setIsRejected(false)
      } catch (error) {
        toast.error('エラー', {
          description: (
            <>
              チャンネル情報の取得に失敗しました。
              <br />
              チャンネルIDを確認してください。
            </>
          )
        })
        setChannelInfo(null)
        setIsRegistered(false)
        setIsRejected(false)
      } finally {
        setIsLoading(false)
      }
    } else {
      setChannelInfo(null)
      setIsRegistered(false)
      setIsRejected(false)
    }
  }, [])

  const onSubmit = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      // TODO: 実際のアプリケーションではここでデータを保存する処理を実装
      toast.success('申請が送信されました', {
        description: `チャンネルID: ${values.channelId}`
      })

      if (!channelInfo) {
        toast.error('エラー', { description: 'チャンネル情報がありません。' })
        return
      }

      // ----- ローカルストレージへの保存処理 (デモ用) -----
      const newApplication = {
        id: Math.random().toString(36).substring(2, 9),
        channelId: values.channelId,
        channelTitle: channelInfo.title,
        country: values.country,
        language: values.language,
        gender: values.gender,
        group: values.group,
        subscriberCount: channelInfo.subscriberCount,
        liveStreamCount: channelInfo.liveStreamCount,
        appliedAt: new Date().toISOString(),
        status: 'pending'
      }

      try {
        const history = JSON.parse(
          localStorage.getItem('applicationHistory') || '[]'
        )
        localStorage.setItem(
          'applicationHistory',
          JSON.stringify([newApplication, ...history])
        )

        // 履歴リストを更新するためにページをリロード
        // より良いのは状態管理や再取得
        window.location.reload()
      } catch (e) {
        console.error('Failed to save to local storage', e)
        toast.error('履歴の保存に失敗しました。')
      }
      // ----- デモ用処理ここまで -----

      // form.reset(); // 送信後にフォームをリセットする場合
    },
    [channelInfo]
  )

  /**
   * 申請ボタンが有効かどうかを判定する
   *
   * 条件:
   * - フォームのバリデーションが通る
   * - チャンネル情報の取得が完了
   * - チャンネルの条件を満たしている
   * - まだPeakXに登録されていない
   * - 却下済みのチャンネルの場合、1ヶ月以上経過している
   */
  const isSubmitEnabled = useMemo(() => {
    const channelConditionsMet =
      channelInfo &&
      channelInfo.meetsSubscriberRequirement &&
      channelInfo.meetsLiveStreamRequirement

    return (
      form.formState.isValid &&
      !isLoading &&
      channelConditionsMet &&
      !isRegistered &&
      !isRejected
    )
  }, [form.formState.isValid, channelInfo, isLoading, isRegistered, isRejected])

  return {
    form,
    channelInfo,
    isLoading,
    isRegistered,
    isRejected,
    handleChannelIdChange,
    onSubmit,
    isSubmitEnabled
  }
}
