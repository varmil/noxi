import { PanelLeftIcon } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetDescription,
  SheetTitle
} from '@/components/ui/sheet'
import SidebarContent from 'components/sidebar/SidebarContent'
import Image from 'components/styles/Image'
import { getGroups } from 'hooks/useGroups'
import { auth } from 'lib/auth'

export default async function HeaderXSSheet() {
  const [session, comp, groups] = await Promise.all([
    auth(),
    getTranslations('Components'),
    getGroups()
  ])

  const allGroupName = comp('header.allGroup')

  // グループデータを整形
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
    schedule: comp('header.schedule'),
    talents: comp('header.talents'),
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
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost" className="lg:hidden">
          <PanelLeftIcon className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[290px] p-0 pt-1" hideCloseButton>
        <SheetHeader hidden>
          <SheetTitle hidden>VCharts</SheetTitle>
          <SheetDescription hidden></SheetDescription>
        </SheetHeader>
        <SidebarContent
          groups={groupsData}
          labels={labels}
          isSignedIn={!!session}
        />
      </SheetContent>
    </Sheet>
  )
}
