'use client'

import type React from 'react'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Loader2 } from 'lucide-react'
import { Session } from 'next-auth'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import { saveUserProfile } from 'apis/user-profiles/saveUserProfile'
import { UserProfileSchema } from 'apis/user-profiles/userProfileSchema'
import { BioTextarea } from 'features/dashboard/profile/components/BioTextarea'
import { NameInput } from 'features/dashboard/profile/components/NameInput'
import { ProfileImageUploader } from 'features/dashboard/profile/components/ProfileImageUploader'
import { UsernameInput } from 'features/dashboard/profile/components/UsernameInput'
import {
  ProfileFormSchema,
  useProfileFormSchema
} from 'features/dashboard/profile/hooks/useProfileSchema'
import { useRouter } from 'lib/navigation'
import { useUploadThing } from 'utils/uploadthing'

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
  const { startUpload } = useUploadThing('imageUploader')
  const feat = useTranslations('Features.dashboard.profile.form')
  const profileFormSchema = useProfileFormSchema()
  const [isLoading, setIsLoading] = useState(false)
  const [newAvatar, setNewAvatar] = useState<NewAvatarState>({
    compressedFile: null,
    previewUrl: null
  })
  const [formKey, setFormKey] = useState(0)

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
  const { handleSubmit } = methods

  const onSubmit = async (data: ProfileFormSchema) => {
    setIsLoading(true)
    const { compressedFile } = newAvatar
    try {
      // 画像をアップロード（指定されていれば）
      let image: string | undefined = undefined
      {
        if (compressedFile) {
          const result = await startUpload([compressedFile])
          image = result?.[0].ufsUrl
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
      toast.success(feat('success.title'), {
        description: feat('success.description')
      })
      router.refresh()
      methods.reset(data)
      setFormKey(prev => prev + 1)
      setIsLoading(false)
      setNewAvatar({ compressedFile: null, previewUrl: null })
    } catch (error) {
      console.error(error)
      setIsLoading(false)
      toast.error(feat('error.title'), {
        description: feat('error.description')
      })
    }
  }

  const handleCropConfirm = ({
    compressedFile,
    previewUrl
  }: {
    compressedFile: File
    previewUrl: string
  }) => {
    setNewAvatar({ compressedFile, previewUrl })
  }

  return (
    <FormProvider {...methods}>
      <form
        className="contents"
        onSubmit={handleSubmit(onSubmit)}
        key={formKey}
      >
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
          <UsernameInput />
          <BioTextarea />
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {feat('loading')}
              </>
            ) : (
              <>{feat('save')}</>
            )}
          </Button>
        </CardFooter>
      </form>
    </FormProvider>
  )
}
