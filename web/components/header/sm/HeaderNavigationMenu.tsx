'use client'

import * as React from 'react'
import { useTranslations } from 'next-intl'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'
import { TalentSearch } from 'components/talent-search/components/TalentSearch'
import {
  ChannelsRankingDefaultUrl,
  StreamRankingDefaultUrl,
} from 'config/constants/RankingRoute'
import { Link } from 'lib/navigation'
import GroupGallery from 'components/group/GroupGallery'

export default function HeaderNavigationMenu() {
  const comp = useTranslations('Components.header')
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem className="hidden lg:block">
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href={StreamRankingDefaultUrl}>
              <div className="flex items-center gap-1">
                <span>{comp('liveRanking')}</span>
              </div>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem className="hidden lg:block">
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href={ChannelsRankingDefaultUrl}>
              <div className="flex items-center gap-1">
                <span>{comp('channelsRanking')}</span>
              </div>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem className="hidden lg:block">
          <NavigationMenuTrigger>{comp('talents')}</NavigationMenuTrigger>
          <NavigationMenuContent className="md:max-h-[80vh] md:overflow-y-auto">
            <GroupGallery
              className="grid gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[808px] lg:grid-cols-3"
              useNavigationMenuLink
            />
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem className="ml-4 md:w-[36vw] lg:w-[max(20vw,200px)] xl:w-[min(35vw,600px)]">
          <div className="absolute -top-[20px] left-0 right-0">
            <TalentSearch className="shadow-none" />
          </div>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
