import { PropsWithChildren } from 'react'
import { ChevronRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Button } from '@/components/ui/button'
import { getGroup } from 'apis/groups'
import { getChannel } from 'apis/youtube/getChannel'
import GroupImageOrIcon from 'components/group/GroupImageOrIcon'
import { Link } from 'lib/navigation'

export default async function SeeMoreLinkSection({
  channelId,
  groupId
}: {
  channelId: string
  groupId: string
}) {
  const [
    page,
    {
      basicInfo: { title }
    }
  ] = await Promise.all([
    getTranslations('Page.youtube.live.id.button'),
    getChannel(channelId)
  ])

  const group = await getGroup(groupId)
  if (!group) {
    throw new Error('Group not found for see more link section')
  }
  const groupName = group.name

  return (
    <div className="border-t border-border pt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center">
        <SeeMoreLinkButton href={`/${groupId}/channels/${channelId}/live`}>
          <TitleSpan>{title}</TitleSpan>
          <Description>
            <span className="line-clamp-1 break-all">
              {page('seeMoreVideos')}
            </span>
            <ChevronRight className="size-4 transition-transform group-hover:translate-x-1 relative top-[1.5px]" />
          </Description>
        </SeeMoreLinkButton>

        <SeeMoreLinkButton
          href={`/ranking/concurrent-viewer/live/${groupId}/realtime`}
        >
          <TitleSpan className="flex items-center justify-center gap-1">
            <GroupImageOrIcon
              groupId={groupId}
              className="size-3.5 relative top-[0.5px]"
            />
            {groupName}
          </TitleSpan>
          <Description>
            <span className="line-clamp-1 break-all">{page('seeTop20')}</span>
            <ChevronRight className="size-4 transition-transform group-hover:translate-x-1 relative top-[1.5px]" />
          </Description>
        </SeeMoreLinkButton>
      </div>
    </div>
  )
}

const SeeMoreLinkButton = ({
  children,
  href
}: PropsWithChildren<{ href: string }>) => {
  return (
    <Button
      variant="outline"
      className="flex h-full py-4 group whitespace-normal"
      asChild
    >
      <Link href={href} prefetch={false}>
        <div className="flex flex-col items-center w-full">{children}</div>
      </Link>
    </Button>
  )
}

const TitleSpan = ({
  children,
  className
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <span
      className={`w-[65%] text-center line-clamp-1 break-all mb-1 ${
        className || ''
      }`}
    >
      {children}
    </span>
  )
}

const Description = ({ children }: PropsWithChildren) => {
  return <div className={`flex items-center gap-1 font-medium`}>{children}</div>
}
