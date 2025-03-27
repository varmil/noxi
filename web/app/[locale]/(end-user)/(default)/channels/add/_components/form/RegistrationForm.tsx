'use client'

import { useLocale, useTranslations } from 'next-intl'
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
import { GroupStrings } from 'config/constants/Group'
import { useRegistrationForm } from '../../_hooks/useRegistrationForm'
import { countrySelects, languageSelects } from '../../_types/channels-add'
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
  const global = useTranslations('Global')
  const locale = useLocale()

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
                    <ErrorMessage message="このチャンネルはすでにPeakXに登録されています。登録後1週間程度でライブの取得が始まります" />
                  )}
                  {!isLoading && isRejected && (
                    <ErrorMessage message="このチャンネルは却下済みのため、現在申請できません。(却下後約1ヶ月経過すると再度申請可能です)" />
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
                      {countrySelects.map(value => (
                        <SelectItem key={value} value={value}>
                          {new Intl.DisplayNames([locale], {
                            type: 'region'
                          }).of(value)}
                        </SelectItem>
                      ))}
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
                      {languageSelects.map(value => (
                        <SelectItem key={value} value={value}>
                          {new Intl.DisplayNames([locale], {
                            type: 'language'
                          }).of(value)}
                        </SelectItem>
                      ))}
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
                          {global('gender.male')}
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="female" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          {global('gender.female')}
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
                      {GroupStrings.map(group => (
                        <SelectItem key={group} value={group}>
                          {global(`group.${group}`)}
                        </SelectItem>
                      ))}
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
