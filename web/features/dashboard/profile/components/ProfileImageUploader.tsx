'use client'

import React, { useState, useCallback, useEffect } from 'react'
import imageCompression from 'browser-image-compression'
import { Loader2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Cropper, { Area } from 'react-easy-crop'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { getCroppedImg } from '../utils/cropImage'

type Props = {
  uploadedBy: number
  onCropConfirm: ({
    compressedFile,
    previewUrl
  }: {
    compressedFile: File
    previewUrl: string
  }) => void
}

const getFilename = (uploadedBy: number) => {
  const env = process.env.NEXT_PUBLIC_VERCEL_ENV ?? 'local'
  return `${env}-user-${uploadedBy}-profile.jpg`
}

export function ProfileImageUploader({ uploadedBy, onCropConfirm }: Props) {
  const feat = useTranslations('Features.dashboard.profile.imageUploader')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [showCropper, setShowCropper] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

  useEffect(() => {
    if (!dialogOpen) {
      setShowCropper(false)
    }
  }, [dialogOpen])

  const onCropComplete = useCallback((_, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // 同じファイルでも再選択できるように value をリセット
    e.target.value = ''

    const reader = new FileReader()
    reader.onload = () => {
      setImageSrc(reader.result as string)
      setDialogOpen(true)

      // Dialog 開いたあと少し遅らせて Cropper を描画（サイズ安定後）
      setTimeout(() => {
        setShowCropper(true)
      }, 150) // 150ms 程度で十分（環境による）
    }
    reader.readAsDataURL(file)
  }

  const handleCropConfirm = async () => {
    if (!imageSrc || !croppedAreaPixels) return
    setIsLoading(true)

    // crop + resize
    const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels)
    const croppedFile = new File([croppedBlob], getFilename(uploadedBy), {
      type: 'image/jpeg'
    })

    // 圧縮
    const compressedFile = await imageCompression(croppedFile, {
      maxWidthOrHeight: 400,
      maxSizeMB: 0.05
    })

    // プレビュー表示用に変換
    const previewUrl = URL.createObjectURL(compressedFile)

    // ダイアログを閉じる
    onCropConfirm({ compressedFile, previewUrl })
    setDialogOpen(false)
    setIsLoading(false)
  }

  return (
    <div>
      <Label
        htmlFor="avatar"
        className="cursor-pointer bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/80"
      >
        {feat('input')}
      </Label>
      <Input
        id="avatar"
        className="hidden"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      <p className="text-xs text-center text-muted-foreground mt-1">Max 1MB</p>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{feat('title')}</DialogTitle>
            <DialogDescription className="hidden">
              {feat('description')}
            </DialogDescription>
          </DialogHeader>

          {imageSrc && showCropper ? (
            <div className="relative w-full aspect-square">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
          ) : (
            <Skeleton className="relative w-full aspect-square" />
          )}

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              {feat('cancel')}
            </Button>
            <Button onClick={handleCropConfirm} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  {feat('loading')}
                </>
              ) : (
                <>{feat('apply')}</>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
