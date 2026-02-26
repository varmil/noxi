import { MessagesSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'lib/navigation'

type Props = {
  channelId: string
  group: string
}

export function HyperChatLink({ channelId, group }: Props) {
  return (
    <Button variant="outline" size="icon" className="size-8" asChild>
      <Link href={`/${group}/channels/${channelId}/hyper-chat`}>
        <MessagesSquare className="size-4" />
      </Link>
    </Button>
  )
}
