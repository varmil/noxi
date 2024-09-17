import { YouTubeEmbed } from '@next/third-parties/google'

type Props = {
  videoId: string
  className?: string
  /** background image */
  img?: string
  style?: string
}

export default function EmbedStream({ videoId, className, img, style }: Props) {
  const EMBED_QUERY = new URLSearchParams({
    modestbranding: '1',
    enablejsapi: '1'
  }).toString()

  return (
    <div className={`grid items-center h-full w-full ${className ?? ''}`}>
      <YouTubeEmbed
        videoid={videoId}
        style={`width:100%; height:100%; max-width:100%; background-size: contain; background-repeat: no-repeat; ${
          img ? `background-image:url(${img});` : ''
        } ${style ?? ''}`}
        params={EMBED_QUERY}
      />
    </div>
  )
}
