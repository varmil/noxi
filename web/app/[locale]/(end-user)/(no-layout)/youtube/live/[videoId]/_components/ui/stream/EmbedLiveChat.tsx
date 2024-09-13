type Props = {
  videoId: string
}

const embed_domain =
  process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL || 'localhost'

export default function EmbedLiveChat({ videoId }: Props) {
  return (
    <iframe
      key={videoId}
      src={`https://www.youtube.com/live_chat?v=${videoId}&embed_domain=${embed_domain}`}
      allowFullScreen
      className="w-full h-full rounded-lg lg:rounded-none"
    ></iframe>
  )
}
