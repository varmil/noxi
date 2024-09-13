import { MessageSquare, Users, Settings, Volume2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import EmbedLiveChat from 'app/[locale]/(end-user)/(no-layout)/youtube/live/[videoId]/_components/ui/stream/EmbedLiveChat'
import EmbedStream from 'app/[locale]/(end-user)/(no-layout)/youtube/live/[videoId]/_components/ui/stream/EmbedStream'

type Props = {
  videoId: string
}

export default function TheaterModeTemplate({ videoId }: Props) {
  return (
    <div className="flex h-svh bg-gray-900 text-white">
      <div className="flex-1 flex flex-col">
        {/* Stream */}
        <section className="flex flex-1 aspect-video w-full h-hull justify-center items-center bg-black ">
          <EmbedStream videoId={videoId} className="w-full h-hull" />
        </section>

        {/* Bottom Bar */}
        <div className="h-16 bg-gray-800 flex items-center px-4 space-x-4">
          <Button variant="ghost" size="icon">
            <Settings className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <Volume2 className="h-6 w-6" />
          </Button>
          <div className="flex-1" />
          <Button variant="ghost" size="icon">
            <Users className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <MessageSquare className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Chat */}
      <section className="w-80 flex flex-col">
        <div className="flex-1">
          <EmbedLiveChat videoId={videoId} />
        </div>
      </section>
    </div>
  )
}
