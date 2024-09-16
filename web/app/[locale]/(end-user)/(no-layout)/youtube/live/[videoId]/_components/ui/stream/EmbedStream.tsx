import { YouTubeEmbed } from '@next/third-parties/google'

type Props = {
  videoId: string
  className?: string
}

export default function EmbedStream({ videoId, className }: Props) {
  const EMBED_QUERY = new URLSearchParams({
    autoplay: '1',
    mute: '1',
    modestbranding: '1'
  }).toString()

  return (
    <div className={`${className ?? ''}`}>
      <YouTubeEmbed
        videoid={videoId}
        style={'width:100%; height:100%; max-width:100%;'}
      />
    </div>
  )

  return (
    <iframe
      key={videoId}
      src={`https://www.youtube.com/embed/${videoId}?${EMBED_QUERY}`}
      allow="accelerometer; autoplay; encrypted-media; picture-in-picture; web-share"
      allowFullScreen
      className={`${className ?? ''} `}
    ></iframe>
  )
}
