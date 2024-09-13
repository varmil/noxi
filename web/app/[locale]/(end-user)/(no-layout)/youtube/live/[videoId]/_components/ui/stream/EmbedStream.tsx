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
    <iframe
      key={videoId}
      src={`https://www.youtube.com/embed/${videoId}?${EMBED_QUERY}`}
      allow="accelerometer; autoplay; encrypted-media; picture-in-picture; web-share"
      allowFullScreen
      className={`aspect-video ${className ?? ''} `}
    ></iframe>
  )
}
