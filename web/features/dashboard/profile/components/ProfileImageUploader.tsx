'use client'

import React, { useState, useCallback } from 'react'
import imageCompression from 'browser-image-compression'
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
import { getCroppedImg } from '../utils/cropImage'

type Props = {
  onCropConfirm: ({
    compressedFile,
    previewUrl
  }: {
    compressedFile: File
    previewUrl: string
  }) => void
}

export function ProfileImageUploader({ onCropConfirm }: Props) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

  const onCropComplete = useCallback((_, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // ✅ 同じファイルでも再選択できるように value をリセット
    e.target.value = ''

    const reader = new FileReader()
    reader.onload = () => {
      setImageSrc(reader.result as string)
      setDialogOpen(true)
    }
    reader.readAsDataURL(file)
  }

  const handleCropConfirm = async () => {
    if (!imageSrc || !croppedAreaPixels) return

    // crop + resize
    const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels)
    const croppedFile = new File([croppedBlob], 'cropped.png', {
      type: 'image/png'
    })

    // 圧縮
    const compressedFile = await imageCompression(croppedFile, {
      maxWidthOrHeight: 400,
      maxSizeMB: 0.2
    })

    // プレビュー表示用に変換
    const previewUrl = URL.createObjectURL(compressedFile)

    // ダイアログを閉じる
    setDialogOpen(false)
    onCropConfirm({ compressedFile, previewUrl })
  }

  return (
    <div>
      <Label
        htmlFor="avatar"
        className="cursor-pointer bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/80"
      >
        画像を参照
      </Label>
      <Input
        id="avatar"
        className="hidden"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md w-full">
          <DialogHeader>
            <DialogTitle>画像をトリミング</DialogTitle>
            <DialogDescription className="hidden">
              プロフィール画像を正方形にトリミングします
            </DialogDescription>
          </DialogHeader>

          {imageSrc && (
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
          )}

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              キャンセル
            </Button>
            <Button onClick={handleCropConfirm}>適用</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
