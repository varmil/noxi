'use client'

import { useState, type JSX } from 'react'
import {
  Activity,
  ChevronDown,
  DollarSign,
  FileChartLine,
  LogOut,
  MailIcon,
  MoreHorizontal,
  Scale,
  UserRoundPlus,
  UsersRound
} from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { ModeToggle } from 'components/ModeToggle'
import { SignOutInSheet } from 'components/header/xs/HeaderItem'
import PrivacyPolicyIcon from 'components/icons/PrivacyPolicyIcon'
import XIcon from 'components/icons/XIcon'
import LanguageSwitcher from 'components/language-switcher/components/LanguageSwitcher'
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
    more: string
    contact: string
    channelsAdd: string
    groupsAdd: string
    xAccount: string
    signOut: string
    ranking: string
    support: string
    info: string
  }
  isSignedIn: boolean
}

function GroupMenuItem({
  group,
  isExpanded,
  onToggle,
  superChatLabel,
  concurrentViewerLabel
}: {
  group: GroupData
  isExpanded: boolean
  onToggle: () => void
  superChatLabel: string
  concurrentViewerLabel: string
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
            <div className="size-4 rounded-full bg-foreground/60" />
          )}
          <span className="text-muted-foreground font-medium text-sm">
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
          <div className="flex flex-col gap-1 pt-1 pb-2 pl-2">
            <Link
              href={`/ranking/super-chat/channels/${group.id}/last30Days`}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm',
                'hover:bg-accent/50',
                'transition-colors duration-150'
              )}
            >
              <div className="flex items-center justify-center size-7 rounded-md bg-accent">
                <DollarSign className="size-4 text-foreground/50" />
              </div>
              <span>{superChatLabel}</span>
            </Link>
            <Link
              href={`/ranking/concurrent-viewer/live/${group.id}/last30Days`}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm',
                'hover:bg-accent/50',
                'transition-colors duration-150'
              )}
            >
              <div className="flex items-center justify-center size-7 rounded-md bg-accent">
                <Activity className="size-4 text-foreground/50" />
              </div>
              <span>{concurrentViewerLabel}</span>
            </Link>
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
        <span>{label}</span>
      </a>
    )
  }

  return (
    <Link href={href} className={linkClassName}>
      <div className="flex items-center justify-center size-7">{icon}</div>
      <span>{label}</span>
    </Link>
  )
}

export default function HeaderXSSheetContent({
  groups,
  labels,
  isSignedIn
}: Props) {
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
    <div className="h-full overflow-y-auto">
      {/* メインナビゲーション */}
      <nav className="p-3 pt-4">
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
            <div className="flex items-center justify-center size-5">
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

        <Separator className="my-4" />

        {/* 情報リンク */}
        <div className="space-y-1">
          <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {labels.info}
          </p>
          <NavLink
            href="https://x.com/VCharts_net"
            icon={<XIcon className="size-4" />}
            label={labels.xAccount}
            external
          />
          <NavLink
            href="/data-methodology-and-disclaimer"
            icon={<FileChartLine className="size-4" />}
            label="Data Methodology"
          />
          <NavLink
            href="/terms-of-use-and-privacy-policy"
            icon={<PrivacyPolicyIcon className="size-4" />}
            label="Terms of Use and PP"
          />
          <NavLink
            href="/legal/tokushoho"
            icon={<Scale className="size-4" />}
            label="特定商取引法に基づく表記"
          />
        </div>

        {isSignedIn && (
          <>
            <Separator className="my-4" />
            <SignOutInSheet
              name={labels.signOut}
              icon={<LogOut className="size-6" />}
            />
          </>
        )}

        <Separator className="my-4" />

        {/* フッター部分 */}
        <div className="flex items-center gap-4 px-3 pt-1 pb-3 ml-0.5">
          <LanguageSwitcher />
          <div className="relative top-px">
            <ModeToggle />
          </div>
        </div>
      </nav>
    </div>
  )
}
