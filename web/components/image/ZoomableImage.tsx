import { DetailedHTMLProps, ImgHTMLAttributes } from 'react'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import {
  Dialog,
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
      <DialogContent className="border-0 bg-transparent p-0 shadow-none">
        <VisuallyHidden>
          <DialogTitle>xxx</DialogTitle>
          <DialogDescription>xxx</DialogDescription>
        </VisuallyHidden>
        <>
          <Image
            src={src}
            alt={alt || ''}
            width={1600}
            height={1600}
            className="h-full w-full object-contain rounded-md"
          />
        </>
      </DialogContent>
    </Dialog>
  )
}
