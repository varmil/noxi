import { getTranslations } from 'next-intl/server'
import SidebarContent from 'components/sidebar/SidebarContent'
import Image from 'components/styles/Image'
import { getGroups } from 'hooks/useGroups'
import { auth } from 'lib/auth'

export default async function Aside({ className }: { className?: string }) {
  const [session, comp, groups] = await Promise.all([
    auth(),
    getTranslations('Components'),
    getGroups()
  ])

  const allGroupName = comp('header.allGroup')

  // グループデータを整形（HeaderXSSheetと同じ）
  const groupsData = [
    { id: 'all', name: allGroupName, icon: undefined },
    ...groups.imgs.slice(0, 2).map(group => ({
      id: group.id,
      name: group.name,
      icon: (
        <Image
          src={group.src}
          alt={group.name}
          width={100}
          height={100}
          className="size-4 rounded-full"
        />
      )
    })),
    ...groups.icons.slice(0, 1).map(group => ({
      id: group.id,
      name: group.name,
      icon: <group.icon className="size-4 rounded-full" />
    }))
  ]

  const labels = {
    allGroupName,
    superChat: comp('header.superChatRanking'),
    concurrentViewer: comp('header.concurrentViewerRanking'),
    more: comp('styles.more'),
    contact: comp('contact.title'),
    channelsAdd: comp('channelsAdd.title'),
    groupsAdd: comp('groupsAdd.title'),
    xAccount: comp('aside.xAccount'),
    signOut: comp('auth.signOut'),
    ranking: comp('header.ranking'),
    support: comp('header.support'),
    info: comp('header.info')
  }

  return (
    <aside
      className={`fixed inset-y-0 left-0 hidden lg:flex w-[280px] flex-col bg-accent/50 z-10 ${
        className ?? ''
      }`}
    >
      <SidebarContent
        groups={groupsData}
        labels={labels}
        isSignedIn={!!session}
      />
    </aside>
  )
}
