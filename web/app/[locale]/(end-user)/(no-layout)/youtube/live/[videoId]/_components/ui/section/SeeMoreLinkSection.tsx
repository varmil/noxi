import { PropsWithChildren } from 'react'
import { ChevronRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Button } from '@/components/ui/button'
import { getChannel } from 'apis/youtube/getChannel'
import GroupImageOrIcon from 'components/group/GroupImageOrIcon'
import { GroupString } from 'config/constants/Group'
import { Link } from 'lib/navigation'

export default async function SeeMoreLinkSection({
  channelId,
  group
}: {
  channelId: string
  group: GroupString
}) {
  const [
    global,
    page,
    {
      basicInfo: { title }
    }
  ] = await Promise.all([
    getTranslations('Global'),
    getTranslations('Page.youtube.live.id.button'),
    getChannel(channelId)
  ])

  return (
    <div className="border-t border-border pt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center">
        <SeeMoreLinkButton href={`/${group}/channels/${channelId}/live`}>
          <TitleSpan>{title}</TitleSpan>
          <Description>
            <span className="line-clamp-1 break-all">
              {page('seeMoreVideos')}
            </span>
            <ChevronRight className="size-4 transition-transform group-hover:translate-x-1 relative top-[1.5px]" />
          </Description>
        </SeeMoreLinkButton>

        <SeeMoreLinkButton
          href={`/ranking/live?dimension=super-chat&period=last7Days&group=${group}`}
        >
          <TitleSpan className="flex items-center justify-center gap-1">
            <GroupImageOrIcon
              groupId={group}
              className="size-3.5 relative top-[0.5px]"
            />
            {global(`group.${group}`)}
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
      <Link href={href} prefetch={true}>
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
