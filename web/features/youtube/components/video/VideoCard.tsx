import { Card, CardContent } from '@/components/ui/card'
import { Link } from 'lib/navigation'

export default function VideoCard() {
  return (
    <Card className="w-full max-w-md">
      <Link
        href="#"
        className="group relative block aspect-video overflow-hidden rounded-lg"
        prefetch={false}
      >
        <img
          src="/placeholder.svg"
          alt="Video Thumbnail"
          width={400}
          height={225}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <PlayIcon className="h-12 w-12 text-white" />
        </div>
        <div className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 rounded-md text-white text-xs">
          <span>2:34</span>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/50 px-2 py-1 rounded-md text-white text-xs">
          <span>Uploaded 2 days ago</span>
        </div>
      </Link>
      <CardContent className="space-y-2 p-4">
        <div>
          <h3 className="text-lg font-medium line-clamp-2">
            Introducing v0: Generative UI
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-1">Vercel</p>
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <EyeIcon className="h-4 w-4" />
            <span>300K views</span>
          </div>
          <div className="flex items-center gap-2">
            <ThumbsUpIcon className="h-4 w-4" />
            <span>15K likes</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageCircleIcon className="h-4 w-4" />
            <span>1.2K comments</span>
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

function MessageCircleIcon(props) {
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
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  )
}

function PlayIcon(props) {
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
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  )
}

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
