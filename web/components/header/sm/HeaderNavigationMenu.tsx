'use client'

import * as React from 'react'
import { Activity, Trophy } from 'lucide-react'
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
import GroupGallery from 'components/group/GroupGallery'
import {
  MostCheeredDefaultUrl,
  TopFansDefaultUrl
} from 'config/constants/RankingRoute'
import { Link } from 'lib/navigation'

export default function HeaderNavigationMenu() {
  const comp = useTranslations('Components.header')
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          {/* https://github.com/amannn/next-intl/issues/1271 */}
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href={MostCheeredDefaultUrl}>
              <div className="flex items-center gap-1">
                <Trophy className="size-4" />
                <span>{comp('mostCheered')}</span>
              </div>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href={TopFansDefaultUrl}>
              <div className="flex items-center gap-1">
                <Activity className="size-4" />
                <span>{comp('topFans')}</span>
              </div>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>{comp('talents')}</NavigationMenuTrigger>
          <NavigationMenuContent className="md:max-h-[80vh] md:overflow-y-auto">
            <GroupGallery
              className="grid gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[808px] lg:grid-cols-3"
              useNavigationMenuLink
            />
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
