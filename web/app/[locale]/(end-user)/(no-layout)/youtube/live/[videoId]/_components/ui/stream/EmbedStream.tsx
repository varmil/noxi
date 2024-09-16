import { YouTubeEmbed } from '@next/third-parties/google'

type Props = {
  videoId: string
  className?: string
  style?: string
}

export default function EmbedStream({ videoId, className, style }: Props) {
  const EMBED_QUERY = new URLSearchParams({
    modestbranding: '1',
    enablejsapi: '1'
  }).toString()

  return (
    <div className={`grid items-center ${className ?? ''}`}>
      <YouTubeEmbed
        videoid={videoId}
        style={`width:100%; height:100%; max-width:100%; ${style ?? ''}`}
        params={EMBED_QUERY}
      />
    </div>
  )
}
