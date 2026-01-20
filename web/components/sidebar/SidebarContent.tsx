'use client'

import { useState, type JSX } from 'react'
import {
  ChevronDown,
  LogOut,
  MailIcon,
  MoreHorizontal,
  UserRoundPlus,
  UsersRound
} from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import Logo from 'components/Logo'
import { ModeToggle } from 'components/ModeToggle'
import LanguageSwitcher from 'components/language-switcher/components/LanguageSwitcher'
import { SignOutButton } from 'components/sidebar/SignOutButton'
import VChartsText from 'components/vcharts/svg/text'
import { Link } from 'lib/navigation'

type GroupData = {
  id: string
  name: string
  icon?: JSX.Element
}

type Props = {
  groups: GroupData[]
  labels: {
    allGroupName: string
    superChat: string
    concurrentViewer: string
    schedule: string
    talents: string
    more: string
    contact: string
    channelsAdd: string
    groupsAdd: string
    signOut: string
    ranking: string
    support: string
  }
  isSignedIn: boolean
}

function GroupMenuItem({
  group,
  isExpanded,
  onToggle,
  superChatLabel,
  concurrentViewerLabel,
  scheduleLabel,
  talentsLabel,
  isAllGroup
}: {
  group: GroupData
  isExpanded: boolean
  onToggle: () => void
  superChatLabel: string
  concurrentViewerLabel: string
  scheduleLabel: string
  talentsLabel: string
  isAllGroup: boolean
}) {
  return (
    <div className="rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className={cn(
          'w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200',
          'hover:bg-accent/80 active:scale-[0.98]'
        )}
      >
        <div className="flex items-center gap-3">
          {group.icon ? (
            group.icon
          ) : (
            <div className="size-4 flex items-center justify-center">
              <div className="size-3 rounded-full bg-foreground/50" />
            </div>
          )}
          <span className="text-muted-foreground font-medium text-sm leading-none">
            {group.name}
          </span>
        </div>
        <ChevronDown
          className={cn(
            'size-4 text-muted-foreground transition-transform duration-200',
            isExpanded && 'rotate-180'
          )}
        />
      </button>

      <div
        className={cn(
          'grid transition-all duration-200 ease-out',
          isExpanded
            ? 'grid-rows-[1fr] opacity-100'
            : 'grid-rows-[0fr] opacity-0'
        )}
      >
        <div className="overflow-hidden">
          <div className="relative ml-[22px] pt-1 pb-1">
            {/* 縦線（最後の項目の中央で終わる） */}
            <div className="absolute left-0 top-0 bottom-[22px] w-px bg-border" />

            <Link
              href={`/ranking/super-chat/channels/${group.id}/last30Days`}
              className={cn(
                'relative flex items-center pl-5 pr-3 py-2 rounded-md text-sm',
                'text-muted-foreground hover:text-foreground hover:bg-accent/50',
                'transition-colors duration-150'
              )}
            >
              {/* L字コネクタ */}
              <div className="absolute left-0 top-1/2 w-4 h-px bg-border" />
              <span>{superChatLabel}</span>
            </Link>
            <Link
              href={`/ranking/concurrent-viewer/live/${group.id}/realtime`}
              className={cn(
                'relative flex items-center pl-5 pr-3 py-2 rounded-md text-sm',
                'text-muted-foreground hover:text-foreground hover:bg-accent/50',
                'transition-colors duration-150'
              )}
            >
              {/* L字コネクタ */}
              <div className="absolute left-0 top-1/2 w-4 h-px bg-border" />
              <span>{concurrentViewerLabel}</span>
            </Link>
            {!isAllGroup && (
              <>
                <Link
                  href={`/${group.id}/scheduled`}
                  className={cn(
                    'relative flex items-center pl-5 pr-3 py-2 rounded-md text-sm',
                    'text-muted-foreground hover:text-foreground hover:bg-accent/50',
                    'transition-colors duration-150'
                  )}
                >
                  {/* L字コネクタ */}
                  <div className="absolute left-0 top-1/2 w-4 h-px bg-border" />
                  <span>{scheduleLabel}</span>
                </Link>
                <Link
                  href={`/${group.id}/charts/channels`}
                  className={cn(
                    'relative flex items-center pl-5 pr-3 py-2 rounded-md text-sm',
                    'text-muted-foreground hover:text-foreground hover:bg-accent/50',
                    'transition-colors duration-150'
                  )}
                >
                  {/* L字コネクタ */}
                  <div className="absolute left-0 top-1/2 w-4 h-px bg-border" />
                  <span>{talentsLabel}</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function NavLink({
  href,
  icon,
  label,
  external
}: {
  href: string
  icon: JSX.Element
  label: string
  external?: boolean
}) {
  const linkClassName = cn(
    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm',
    'text-muted-foreground hover:text-foreground hover:bg-accent',
    'transition-colors duration-150'
  )

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
      >
        <div className="flex items-center justify-center size-7">{icon}</div>
        <span className="leading-none">{label}</span>
      </a>
    )
  }

  return (
    <Link href={href} className={linkClassName}>
      <div className="flex items-center justify-center size-7">{icon}</div>
      <span className="leading-none">{label}</span>
    </Link>
  )
}

export default function SidebarContent({ groups, labels, isSignedIn }: Props) {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    () => new Set(groups.map(g => g.id))
  )

  const toggleGroup = (id: string) => {
    setExpandedGroups(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <ScrollArea className="h-full">
      {/* ロゴヘッダー（h-14 = 56px でメインヘッダーと同じ高さ） */}
      <div className="flex h-14 shrink-0 items-center gap-1 px-6">
        <Link
          href="/"
          className="flex items-center gap-1 transition-all hover:scale-105"
        >
          <Logo className="size-6" />
          <VChartsText />
        </Link>
      </div>

      {/* メインナビゲーション */}
      <nav className="p-3 pt-5">
        {/* グループセクション */}
        <div className="space-y-1">
          <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {labels.ranking}
          </p>
          {groups.map(group => (
            <GroupMenuItem
              key={group.id}
              group={group}
              isExpanded={expandedGroups.has(group.id)}
              onToggle={() => toggleGroup(group.id)}
              superChatLabel={labels.superChat}
              concurrentViewerLabel={labels.concurrentViewer}
              scheduleLabel={labels.schedule}
              talentsLabel={labels.talents}
              isAllGroup={group.id === 'all'}
            />
          ))}

          {/* もっと見る */}
          <Link
            href="/groups"
            className={cn(
              'flex items-center gap-3 p-3 rounded-lg text-sm',
              'text-muted-foreground hover:text-foreground hover:bg-accent',
              'transition-colors duration-150'
            )}
          >
            <div className="flex items-center justify-center">
              <MoreHorizontal className="size-4" />
            </div>
            <span>{labels.more}</span>
          </Link>
        </div>

        <Separator className="my-4" />

        {/* サポートリンク */}
        <div className="space-y-1">
          <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {labels.support}
          </p>
          <NavLink
            href="/contact"
            icon={<MailIcon className="size-4" />}
            label={labels.contact}
          />
          <NavLink
            href="/channels/add"
            icon={<UserRoundPlus className="size-4" />}
            label={labels.channelsAdd}
          />
          <NavLink
            href="/groups/add"
            icon={<UsersRound className="size-4" />}
            label={labels.groupsAdd}
          />
        </div>

        {isSignedIn && (
          <>
            <Separator className="my-4" />
            <div className="px-3">
              <SignOutButton
                name={labels.signOut}
                icon={<LogOut className="size-4" />}
              />
            </div>
          </>
        )}

        <Separator className="my-4" />

        {/* フッター部分 */}
        <div className="flex items-center gap-4 px-3 pt-1 pb-3 ml-0.5">
          <LanguageSwitcher />
          <ModeToggle />
        </div>
      </nav>
    </ScrollArea>
  )
}
