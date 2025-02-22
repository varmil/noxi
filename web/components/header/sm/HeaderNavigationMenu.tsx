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
import GroupGallery from 'components/group/GroupGallery'
import { Link } from 'lib/navigation'

export default function HeaderNavigationMenu() {
  const comp = useTranslations('Components.header')
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          {/* https://github.com/amannn/next-intl/issues/1271 */}
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/youtube/live/ranking?period=realtime" prefetch={true}>
              {comp('liveRanking')}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link
              href="/youtube/channels/ranking?period=last24Hours"
              prefetch={true}
            >
              {comp('channelsRanking')}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>{comp('talents')}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <GroupGallery
              className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] text-sm"
              useNavigationMenuLink
            />
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
