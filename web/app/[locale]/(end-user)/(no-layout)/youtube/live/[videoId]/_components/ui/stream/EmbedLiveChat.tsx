import CloseChatButton from 'app/[locale]/(end-user)/(no-layout)/youtube/live/[videoId]/_components/ui/button/CloseChatButton'

type Props = {
  videoId: string
  className?: string
  showCloseButton?: boolean
}

const embed_domain = process.env.VERCEL_PROJECT_PRODUCTION_URL || 'localhost'

export default function EmbedLiveChat({
  videoId,
  className,
  showCloseButton
}: Props) {
  return (
    <>
      {showCloseButton && (
        <CloseChatButton className={'absolute top-1 right-1 z-1'} />
      )}
      <iframe
        key={videoId}
        loading="lazy"
        src={`https://www.youtube.com/live_chat?v=${videoId}&embed_domain=${embed_domain}`}
        allowFullScreen
        className={`w-full h-full rounded-lg lg:rounded-none ${
          className ?? ''
        }`}
      ></iframe>
    </>
  )
}
