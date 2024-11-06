import { VideoSchema } from 'apis/youtube/schema/videoSchema'
import Image from 'components/styles/Image'

type Props = {
  title: string
  thumbnails: VideoSchema['snippet']['thumbnails']
  className?: string
  size: keyof VideoSchema['snippet']['thumbnails']
}

export default function VideoThumbnail({
  title,
  thumbnails,
  className,
  size
}: Props) {
  return (
    <Image
      src={getSrcSet(size, thumbnails)}
      alt={`Video Thumbnail: ${title}`}
      width={16}
      height={9}
      className={`aspect-video h-full w-full object-cover transition-transform duration-100 group-hover:scale-105 ${
        className || ''
      }`}
    />
  )
}
function getSrcSet(
  size: string,
  thumbnails: VideoSchema['snippet']['thumbnails']
) {
  let srcSet = {}

  switch (size) {
    case 'maxres':
      srcSet = {
        '1x':
          thumbnails['maxres']?.url ||
          thumbnails['standard']?.url ||
          thumbnails['high']?.url ||
          thumbnails['medium']?.url ||
          thumbnails['default']?.url,
        '2x':
          thumbnails['maxres']?.url ||
          thumbnails['standard']?.url ||
          thumbnails['high']?.url ||
          thumbnails['medium']?.url ||
          thumbnails['default']?.url
      }
      break

    default:
    case 'standard':
      srcSet = {
        '1x':
          thumbnails['standard']?.url ||
          thumbnails['high']?.url ||
          thumbnails['medium']?.url ||
          thumbnails['default']?.url,
        '2x':
          thumbnails['maxres']?.url ||
          thumbnails['standard']?.url ||
          thumbnails['high']?.url ||
          thumbnails['medium']?.url ||
          thumbnails['default']?.url
      }
    case 'high':
      srcSet = {
        '1x':
          thumbnails['high']?.url ||
          thumbnails['medium']?.url ||
          thumbnails['default']?.url,
        '2x':
          thumbnails['maxres']?.url ||
          thumbnails['standard']?.url ||
          thumbnails['high']?.url ||
          thumbnails['medium']?.url ||
          thumbnails['default']?.url
      }
      break

    case 'medium':
      srcSet = {
        '1x': thumbnails['medium']?.url || thumbnails['default']?.url,
        '2x':
          thumbnails['standard']?.url ||
          thumbnails['high']?.url ||
          thumbnails['medium']?.url ||
          thumbnails['default']?.url
      }
      break

    case 'default':
      srcSet = {
        '1x': thumbnails['default']?.url,
        '2x': thumbnails['medium']?.url || thumbnails['default']?.url
      }
      break
  }

  return srcSet
}