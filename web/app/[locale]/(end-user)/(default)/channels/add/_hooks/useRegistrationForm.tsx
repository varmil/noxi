import { useCallback, useMemo, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { getChannelForAdd } from 'apis/youtube/data-api/getChannelForAdd'
import { ChannelInfo } from 'apis/youtube/data-api/getChannelForAdd'
import { existsChannel } from 'apis/youtube/getChannel'
import { getChannelRegistration } from 'apis/youtube/getChannelRegistration'
import { postChannelRegistration } from 'apis/youtube/postChannelRegistration'
import dayjs from 'lib/dayjs'
import { useRouter } from 'lib/navigation'

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
    message: '性別を選択してください'
  }),
  group: z.string().min(1, { message: '所属事務所を選択してください' })
})

const formDefaultValues = {
  channelId: '',
  country: 'JP',
  language: 'ja',
  gender: 'female',
  group: ''
} as const

export function useRegistrationForm() {
  const router = useRouter()

  const [channelInfo, setChannelInfo] = useState<ChannelInfo | null>(null)
  /** チャンネル情報をData API & Closed API Serverから取得中 */
  const [isLoading, setIsLoading] = useState(false)
  /** すでに当該チャンネルが登録されている */
  const [isRegistered, setIsRegistered] = useState(false)
  /** すでに申請が存在し、approved or done になっている */
  const [isAlreadyApproved, setIsAlreadyApproved] = useState(false)
  /** 当該チャンネルが却下済み && 1ヶ月以上経過していない */
  const [isRejected, setIsRejected] = useState(false)

  const resetStates = useCallback(() => {
    setChannelInfo(null)
    setIsRegistered(false)
    setIsAlreadyApproved(false)
    setIsRejected(false)
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formDefaultValues
  })

  /**
   * チャンネルIDの変更を処理する
   *
   * 却下済みのチャンネルの判定
   *   status === 'rejected' かつ appliedAt が 1ヶ月以上経過していない場合、
   *   isRejected を true にする
   */
  const handleChannelIdChange = useCallback(
    async (value: string) => {
      // UCから始まる24桁の英数字かどうかをチェック
      if (value.match(/^UC[a-zA-Z0-9_-]{22}$/)) {
        setIsLoading(true)
        setChannelInfo(null)

        try {
          const [info, registration, exists] = await Promise.all([
            getChannelForAdd(value),
            getChannelRegistration(value),
            existsChannel(value)
          ])
          setChannelInfo(info)
          setIsAlreadyApproved(
            registration?.status === 'approved' ||
              registration?.status === 'done'
          )
          setIsRegistered(exists)
          setIsRejected(
            registration?.status === 'rejected' &&
              dayjs().isBefore(dayjs(registration?.appliedAt).add(30, 'day'))
          )
        } catch {
          toast.error('エラー', {
            description: (
              <>
                チャンネル情報の取得に失敗しました。
                <br />
                チャンネルIDを確認してください。
              </>
            )
          })
          resetStates()
        } finally {
          setIsLoading(false)
        }
      } else {
        resetStates()
      }
    },
    [resetStates]
  )

  const onSubmit = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      toast.success('送信中...', {
        description: `チャンネルID: ${values.channelId}`
      })

      if (!channelInfo) {
        toast.error('エラー', { description: 'チャンネル情報がありません。' })
        return
      }

      try {
        await postChannelRegistration({
          channelId: values.channelId,
          title: channelInfo.title,
          country: values.country,
          language: values.language,
          gender: values.gender,
          group: values.group,
          subscriberCount: channelInfo.subscriberCount,
          liveStreamCount: channelInfo.liveStreamCount,
          appliedAt: new Date().toISOString()
        })

        toast.success('申請を送信しました', {
          description: `チャンネルID: ${values.channelId}`
        })

        // 履歴リストを更新するためにリロード
        router.refresh()
        form.reset(formDefaultValues)
        resetStates()
      } catch (e) {
        console.error('Failed to save application', e)
        toast.error('申請に失敗しました。')
      }
    },
    [channelInfo, form, router, resetStates]
  )

  /**
   * 申請ボタンが有効かどうかを判定する
   *
   * 条件:
   * - フォームのバリデーションが通る
   * - チャンネル情報の取得が完了
   * - チャンネルの条件を満たしている
   * - まだ承認されていない
   * - まだVchartsに登録されていない
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
      !isAlreadyApproved &&
      !isRegistered &&
      !isRejected
    )
  }, [
    form.formState.isValid,
    channelInfo,
    isLoading,
    isAlreadyApproved,
    isRegistered,
    isRejected
  ])

  return {
    form,
    channelInfo,
    isLoading,
    isAlreadyApproved,
    isRegistered,
    isRejected,
    handleChannelIdChange,
    onSubmit,
    isSubmitEnabled
  }
}
