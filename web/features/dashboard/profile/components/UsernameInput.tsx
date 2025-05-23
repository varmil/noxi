'use client'

import { useState, useEffect } from 'react'
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'
import { useDebouncedCallback } from 'use-debounce'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { checkUsername } from 'features/dashboard/profile/actions/checkUsernameActions'
import {
  MAX_USERNAME_LENGTH,
  MIN_USERNAME_LENGTH
} from 'features/dashboard/profile/hooks/useProfileSchema'
import { getWebUrl } from 'utils/web-url'

export function UsernameInput() {
  const {
    control,
    watch,
    formState: { dirtyFields, errors }
  } = useFormContext()

  const locale = useLocale()
  const feat = useTranslations('Features.dashboard.profile.form')
  const username = watch('username')
  const [isChecking, setIsChecking] = useState(false)
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null)
  const [serverMessage, setServerMessage] = useState('')

  // hooksを持ってくると無限に通信ループに入っちゃうので仕方なく重複コードを使う
  const isValid = (username: string) => {
    return (
      username.length >= MIN_USERNAME_LENGTH &&
      username.length <= MAX_USERNAME_LENGTH &&
      /^[a-zA-Z0-9_]*$/.test(username)
    )
  }

  // debounceを使用してサーバーへの問い合わせを最適化
  const debouncedCheck = useDebouncedCallback(async (value: string) => {
    if (!isValid(value)) {
      setIsAvailable(null)
      setServerMessage('')
      return
    }

    try {
      setIsChecking(true)
      const result = await checkUsername(value)
      // 通信が終わるまでにユーザー名が変更されなかった場合に限りOK/NG表示
      if (value === username) {
        setIsAvailable(result.available)
        setServerMessage(result.message)
      }
    } catch (error) {
      console.error(error)
      setIsAvailable(false)
      setServerMessage('エラーが発生しました。後でもう一度お試しください。')
    } finally {
      setIsChecking(false)
    }
  }, 500) // 500ms後に実行

  // ユーザー名が変更されたらチェックを実行
  useEffect(() => {
    if (errors.username) {
      setIsAvailable(null)
      setServerMessage('')
      return
    }
    if (!dirtyFields.username) {
      return // 変更がない場合はスキップ
    }
    if (isValid(username)) {
      debouncedCheck(username)
    } else {
      setIsAvailable(null)
      setServerMessage('')
    }
  }, [username, debouncedCheck, errors.username, dirtyFields.username])

  // ヘルパーメッセージを追加
  // 全角文字や特殊文字のチェック
  const getHelperMessage = (value: string) => {
    if (!value) return null
    if (!/^[a-zA-Z0-9_]*$/.test(value)) {
      return feat('usernameRegex')
    }
    return null
  }

  return (
    <FormField
      control={control}
      name="username"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            <div className="w-full flex items-center justify-between">
              <span>{feat('username')}</span>
              <span className="text-sm text-muted-foreground">
                {username.length} / {MAX_USERNAME_LENGTH}
              </span>
            </div>
          </FormLabel>
          <div className="relative">
            <FormControl>
              <Input
                placeholder="username"
                {...field}
                maxLength={MAX_USERNAME_LENGTH}
                className={`pr-10 ${
                  isAvailable === true
                    ? 'border-green-500 focus-visible:ring-green-500'
                    : isAvailable === false
                    ? 'border-red-500 focus-visible:ring-red-500'
                    : ''
                }`}
              />
            </FormControl>
            <FormDescription className="break-anywhere">
              {feat('yourURL', {
                url: `${getWebUrl()}/${locale}/users/${field.value}`
              })}
            </FormDescription>
            {isChecking && (
              <div className="absolute right-3 top-3 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            )}
            {!isChecking && isAvailable === true && (
              <div className="absolute right-3 top-3 text-green-500">
                <CheckCircle2 className="h-4 w-4" />
              </div>
            )}
            {!isChecking && isAvailable === false && (
              <div className="absolute right-3 top-3 text-red-500">
                <XCircle className="h-4 w-4" />
              </div>
            )}
          </div>
          <FormMessage />
          {/* ヘルパーメッセージを表示 */}
          {!errors.username && getHelperMessage(username) && (
            <p className="text-amber-500 text-sm">
              {getHelperMessage(username)}
            </p>
          )}
          {/* サーバーからのメッセージを表示 */}
          {!errors.username && !getHelperMessage(username) && serverMessage && (
            <p
              className={
                isAvailable ? 'text-green-500 text-sm' : 'text-red-500 text-sm'
              }
            >
              {serverMessage}
            </p>
          )}
        </FormItem>
      )}
    />
  )
}
