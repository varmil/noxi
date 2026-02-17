'use client'

import { useTranslations } from 'next-intl'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'
import { TalentSearch } from 'components/talent-search/components/TalentSearch'
import {
  ChannelsRankingDefaultUrl,
  StreamRankingDefaultUrl
} from 'config/constants/RankingRoute'
import { Link } from 'lib/navigation'

export default function HeaderNavigationMenu({}: {}) {
  const comp = useTranslations('Components.header')
  return (
    <div className="flex flex-1 items-center gap-4">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem className="hidden lg:block">
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/">
                <div className="flex items-center gap-1">
                  <span>{comp('home')}</span>
                </div>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem className="hidden lg:block">
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href={ChannelsRankingDefaultUrl}>
                <div className="flex items-center gap-1">
                  <span>{comp('channelsRanking')}</span>
                </div>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem className="hidden lg:block">
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href={StreamRankingDefaultUrl}>
                <div className="flex items-center gap-1">
                  <span>{comp('liveRanking')}</span>
                </div>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem className="hidden lg:block">
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/hyper-chat">
                <div className="flex items-center gap-1">
                  <span>{comp('hyperChat')}</span>
                </div>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex-1 max-w-125">
        <TalentSearch className="shadow-none" dropdown />
      </div>
    </div>
  )
}
