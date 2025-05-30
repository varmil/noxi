'use client'

import type React from 'react'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle, ArrowRight, Loader2 } from 'lucide-react'
import { Session } from 'next-auth'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import { saveUserProfile } from 'apis/user-profiles/saveUserProfile'
import { UserProfileSchema } from 'apis/user-profiles/userProfileSchema'
import { deleteOldImage } from 'features/dashboard/profile/actions/deleteOldImageActions'
import { uploadAvatarActions } from 'features/dashboard/profile/actions/uploadAvatarActions'
import { BioTextarea } from 'features/dashboard/profile/components/BioTextarea'
import { NameInput } from 'features/dashboard/profile/components/NameInput'
import { ProfileImageUploader } from 'features/dashboard/profile/components/ProfileImageUploader'
import { UsernameInput } from 'features/dashboard/profile/components/UsernameInput'
import {
  ProfileFormSchema,
  useProfileFormSchema
} from 'features/dashboard/profile/hooks/useProfileSchema'
import { useRouter } from 'lib/navigation'
import { checkImageModeration, checkModeration } from 'utils/input/moderation'

type NewAvatarState = {
  compressedFile: File | null
  previewUrl: string | null
}

export default function ProfileForm({
  session,
  userProfile
}: {
  session: Session
  userProfile?: UserProfileSchema
}) {
  const router = useRouter()
  const profileFormSchema = useProfileFormSchema()
  const feat = useTranslations('Features.dashboard.profile.form')
  const [isLoading, setIsLoading] = useState(false)
  const [newAvatar, setNewAvatar] = useState<NewAvatarState>({
    compressedFile: null,
    previewUrl: null
  })
  const [isImageModerationOk, setIsImageModerationOk] = useState(true)
  const [isModerationOk, setIsModerationOk] = useState(true)
  const [submitCount, setSubmitCount] = useState(0)

  const displayName = session.user?.name || 'User (Preview)'
  const currentAvatar =
    session.user?.image || '/placeholder.svg?height=100&width=100'

  const methods = useForm<ProfileFormSchema>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: displayName,
      username: userProfile?.username || '',
      bio: userProfile?.description || ''
    },
    mode: 'onChange'
  })
  const {
    handleSubmit,
    formState: { isDirty }
  } = methods

  const onSubmit = async (data: ProfileFormSchema) => {
    setIsLoading(true)
    const { compressedFile } = newAvatar
    try {
      // Moderation API
      {
        const name = data.name
        const username = data.username
        const bio = data.bio
        const [isNameOk, isUsernameOk, isBioOk] = await Promise.all([
          checkModeration(name),
          checkModeration(username),
          checkModeration(bio)
        ])
        if (!isNameOk || !isUsernameOk || !isBioOk) {
          setIsModerationOk(false)
          setIsLoading(false)
          return
        }
      }
      // 画像をアップロード（指定されていれば）
      let image: string | undefined = undefined
      {
        if (compressedFile) {
          const formData = new FormData()
          formData.append('file', compressedFile, compressedFile.name)
          const data = await uploadAvatarActions(formData)
          if (!data) throw new Error('Failed to upload image')
          image = data.ufsUrl
        }
      }
      // プロフィール更新
      {
        await saveUserProfile({
          name: data.name,
          username: data.username,
          image,
          description: data.bio
        })
      }
      // 後処理 (古い画像を削除)
      if (image) {
        deleteOldImage(userProfile?.image).catch(console.error)
      }

      onSuccess(data)
    } catch (error) {
      onError(error)
    }
  }

  const onSuccess = (data: ProfileFormSchema) => {
    toast.success(feat('success.title'), {
      description: feat('success.description')
    })
    router.refresh()
    methods.reset(data)
    setIsLoading(false)
    setNewAvatar({ compressedFile: null, previewUrl: null })
    setIsModerationOk(true)
    setSubmitCount(prev => prev + 1)
  }
  const onError = (e: unknown) => {
    console.error(e)
    toast.error(feat('error.title'), {
      description: feat('error.description')
    })
    setIsLoading(false)
  }
  const handleCropConfirm = ({
    compressedFile,
    previewUrl
  }: {
    compressedFile: File
    previewUrl: string
  }) => {
    const reader = new FileReader()
    reader.onload = async () => {
      // 先にUI反映
      setNewAvatar({ compressedFile, previewUrl })
      const base64 = reader.result as string
      setIsImageModerationOk(await checkImageModeration(base64))
    }
    reader.readAsDataURL(compressedFile)
  }

  return (
    <FormProvider {...methods}>
      <form className="contents" onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center gap-2">
              <Avatar className="size-24">
                <AvatarImage src={currentAvatar} alt={displayName} />
                <AvatarFallback>{displayName.slice(0, 2)}</AvatarFallback>
              </Avatar>
              {newAvatar.previewUrl && (
                <>
                  <ArrowRight className="size-5" />
                  <Avatar className="size-24">
                    <AvatarImage src={newAvatar.previewUrl} alt={displayName} />
                    <AvatarFallback>{displayName.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                </>
              )}
            </div>
            <div className="flex items-center gap-2">
              <ProfileImageUploader
                uploadedBy={Number(session.user.id)}
                onCropConfirm={handleCropConfirm}
              />
            </div>
          </div>
          <NameInput />
          <UsernameInput key={submitCount} />
          <BioTextarea />
          {(!isImageModerationOk || !isModerationOk) && (
            <Alert variant="destructive">
              <AlertCircle className="size-4" />
              <AlertTitle>{feat('error.title')}</AlertTitle>
              <AlertDescription>{feat('moderationFailed')}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          <div className="flex flex-col items-start gap-2">
            <Button
              type="submit"
              disabled={
                // 何も変更していない
                !(isDirty || newAvatar.compressedFile) ||
                // 送信中
                isLoading ||
                // 画像のモデレーションNG
                !isImageModerationOk
              }
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  {feat('loading')}
                </>
              ) : (
                <>{feat('save')}</>
              )}
            </Button>
            <div className="text-xs text-muted-foreground">
              {feat('saveTips')}
            </div>
          </div>
        </CardFooter>
      </form>
    </FormProvider>
  )
}
