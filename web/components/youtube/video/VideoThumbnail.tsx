import { VideoSchema } from 'apis/youtube/schema/videoSchema'
import Image from 'components/styles/Image'

type Props = {
  title: string
  thumbnails: VideoSchema['snippet']['thumbnails']
  className?: string
}

export default function VideoThumbnail({
  title,
  thumbnails,
  className
}: Props) {
  return (
    <Image
      src={{
        '1x':
          thumbnails['standard']?.url ||
          thumbnails['high']?.url ||
          thumbnails['default']?.url,
        '2x':
          thumbnails['maxres']?.url ||
          thumbnails['high']?.url ||
          thumbnails['default']?.url
      }}
      alt={`Video Thumbnail: ${title}`}
      width={16}
      height={9}
      className={`h-full w-full object-cover transition-transform duration-200 group-hover:scale-105 ${
        className || ''
      }`}
    />
  )
}
