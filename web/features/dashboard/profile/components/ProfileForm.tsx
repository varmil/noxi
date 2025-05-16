'use client'

import type React from 'react'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Loader2 } from 'lucide-react'
import { Session } from 'next-auth'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { saveUserProfile } from 'apis/user-profiles/saveUserProfile'
import { UserProfileSchema } from 'apis/user-profiles/userProfileSchema'
import { ProfileImageUploader } from 'features/dashboard/profile/components/ProfileImageUploader'
import {
  MAX_BIO_LENGTH,
  MAX_USERNAME_LENGTH,
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
  const currentAvatar =
    session.user?.image || '/placeholder.svg?height=100&width=100'

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<ProfileFormSchema>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: session.user?.name || 'User (Preview)',
      bio: userProfile?.description || ''
    }
  })
  const username = watch('username')

  const onSubmit = async (data: ProfileFormSchema) => {
    setIsLoading(true)
    const { compressedFile } = newAvatar

    try {
      // 画像をアップロード（指定されていれば）
      let image: string | undefined = undefined
      {
        if (compressedFile) {
          const result = await startUpload([compressedFile])
          console.log({
            user: result?.[0].serverData.uploadedBy,
            url: result?.[0].ufsUrl
          })
          image = result?.[0].ufsUrl
        }
      }

      // プロフィール更新
      {
        await saveUserProfile({
          name: data.username,
          image,
          description: data.bio
        })
      }

      toast.success(feat('success.title'), {
        description: feat('success.description')
      })
      router.refresh()
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
    <form className="contents" onSubmit={handleSubmit(onSubmit)}>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center gap-2">
            <Avatar className="size-24">
              <AvatarImage src={currentAvatar} alt={username} />
              <AvatarFallback>{username.slice(0, 2)}</AvatarFallback>
            </Avatar>
            {newAvatar.previewUrl && (
              <>
                <ArrowRight className="size-5" />
                <Avatar className="size-24">
                  <AvatarImage src={newAvatar.previewUrl} alt={username} />
                  <AvatarFallback>{username.slice(0, 2)}</AvatarFallback>
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
        <div className="space-y-2">
          <Label htmlFor="username">
            <div className="w-full flex items-center justify-between">
              <span>{feat('username')}</span>
              <span className="text-sm text-muted-foreground">
                {username.length} / {MAX_USERNAME_LENGTH}
              </span>
            </div>
          </Label>
          <Input
            id="username"
            {...register('username')}
            maxLength={MAX_USERNAME_LENGTH}
          />
          {errors.username && (
            <p className="text-sm text-destructive">
              {errors.username.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="bio">
            <div className="w-full flex items-center justify-between">
              <span>{feat('bio')}</span>
              <span className="text-sm text-muted-foreground">
                {watch('bio').length} / {MAX_BIO_LENGTH}
              </span>
            </div>
          </Label>
          <Textarea
            id="bio"
            {...register('bio')}
            rows={4}
            maxLength={MAX_BIO_LENGTH}
          />
          {errors.bio && (
            <p className="text-sm text-destructive">{errors.bio.message}</p>
          )}
        </div>
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
  )
}
