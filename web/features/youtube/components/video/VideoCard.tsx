import { Card, CardContent } from '@/components/ui/card'
import { VideoSchema } from 'api-schema/youtube/videoSchema'
import CommentIcon from 'components/icons/CommentIcon'
import Image from 'components/styles/Image'
import IntlNumberFormat from 'components/styles/IntlNumberFormat'
import dayjs from 'lib/dayjs'
import { Link } from 'lib/navigation'

export default function VideoCard(video: VideoSchema) {
  const { id, snippet, duration, statistics } = video
  const { title, description, thumbnails, publishedAt } = snippet
  const { viewCount, likeCount, commentCount } = statistics

  const d = dayjs.duration(duration)
  const hours = d.hours()

  return (
    <Card className="w-full">
      <Link
        href="#"
        className="group relative block aspect-video overflow-hidden rounded-lg"
        prefetch={false}
      >
        <Image
          src={{
            '1x': thumbnails['medium']?.url,
            '2x': thumbnails['high']?.url
          }}
          alt={`Video Thumbnail: ${title}`}
          width={400}
          height={225}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* TODO: When /videos/:id page is created, comment in here. */}
        {/* <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <LineChart className="h-12 w-12 text-white" />
        </div> */}
        <div className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 rounded-md text-white text-xs">
          <span>{dayjs(publishedAt).fromNow()}</span>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/50 px-2 py-1 rounded-md text-white text-xs">
          <span>
            {d.format(
              [hours && 'H', 'm', 'ss'].filter(Boolean).join(':').trim()
            )}
          </span>
        </div>
      </Link>
      <CardContent className="space-y-2 p-4 pt-2">
        <div>
          <h3 className="font-normal line-clamp-2 leading-tight text-sm">
            {title}
          </h3>
        </div>
        <div className="flex items-center gap-2 md:gap-4 text-xs text-muted-foreground">
          <div className="flex items-center">
            <span>
              <IntlNumberFormat>{viewCount}</IntlNumberFormat>{' '}
              <span>views</span>
            </span>
          </div>
          <div className="flex items-center gap-0.5">
            <ThumbsUpIcon className="h-4 w-4" />
            <span>
              <IntlNumberFormat>{likeCount}</IntlNumberFormat>
              <span className="sr-only">likes</span>
            </span>
          </div>
          <div className="flex items-center gap-0.5">
            <CommentIcon className="h-4 w-4" />
            <span>
              <IntlNumberFormat>{commentCount}</IntlNumberFormat>
              <span className="sr-only">comments</span>
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function EyeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

// function MessageCircleIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
//     </svg>
//   )
// }

function ThumbsUpIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 10v12" />
      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
    </svg>
  )
}
