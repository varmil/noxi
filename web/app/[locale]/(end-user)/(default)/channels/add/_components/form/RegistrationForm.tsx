'use client'

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
import { useRegistrationForm } from '../../_hooks/useRegistrationForm'
import HowToCheckChannelIdPopover from './HowToCheckChannelIdPopover'
import RegistrationFormChannelInfo from './RegistrationFormChannelInfo'
import RegistrationFormSkeleton from './RegistrationFormSkeleton'

export function RegistrationForm() {
  const {
    form,
    channelInfo,
    isLoading,
    isRegistered,
    isRejected,
    handleChannelIdChange,
    onSubmit,
    isSubmitEnabled
  } = useRegistrationForm()

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
                  {!isLoading && isRegistered && (
                    <ErrorMessage message="このチャンネルはすでにPeakXに登録されています。" />
                  )}
                  {!isLoading && isRejected && (
                    <ErrorMessage message="このチャンネルは却下済みのため、現在申請できません。(却下後1ヶ月経過すると再度申請可能です)" />
                  )}
                </FormItem>
              )}
            />

            {isLoading && <RegistrationFormSkeleton />}

            {!isLoading && channelInfo && (
              <RegistrationFormChannelInfo channelInfo={channelInfo} />
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
              name="group"
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
              disabled={!isSubmitEnabled}
            >
              申請する
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

const ErrorMessage = ({ message }: { message: string }) => (
  <p className="text-sm font-medium text-destructive">{message}</p>
)
