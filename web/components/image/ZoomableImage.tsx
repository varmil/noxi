'use client'

import { ComponentProps, DetailedHTMLProps, ImgHTMLAttributes } from 'react'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import Image from 'components/styles/Image'

export default function ZoomableImage({
  src,
  alt,
  width,
  height,
  className
}: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {
  src: ComponentProps<typeof Image>['src']
  width: number
  height: number
}) {
  if (!src) return null
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Image
          src={src}
          alt={alt || ''}
          className={`${className} cursor-pointer`}
          width={width}
          height={height}
        />
      </DialogTrigger>
      <DialogContent
        className="max-h-[90dvh] border-0 bg-transparent p-0 shadow-none [&>button]:hidden"
        onOpenAutoFocus={e => e.preventDefault()}
      >
        <VisuallyHidden>
          <DialogTitle>xxx</DialogTitle>
          <DialogDescription>xxx</DialogDescription>
        </VisuallyHidden>
        <DialogClose asChild>
          <Image
            src={src}
            alt={alt || ''}
            width={1600}
            height={1600}
            className="max-h-[90dvh] w-full cursor-pointer rounded-md object-contain"
          />
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}
