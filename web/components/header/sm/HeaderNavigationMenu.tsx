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
import { cn } from '@/lib/utils'
import Image from 'components/styles/Image'
import useGroups from 'hooks/useGroups'
import { Link } from 'lib/navigation'

export default function HeaderNavigationMenu() {
  const t = useTranslations('Components.header')
  const groups = useGroups()
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          {/* https://github.com/amannn/next-intl/issues/1271 */}
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/youtube/ranking/live?period=realtime">Live</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Talents</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {groups.imgs.map(group => (
                <ListItem
                  key={group.id}
                  title={group.name}
                  href={`/${group.id}`}
                  icon={
                    <Image
                      src={group.src}
                      alt={`${group.name} icon`}
                      width={100}
                      height={100}
                      className={`rounded-full`}
                    />
                  }
                >
                  {t(group.count.isAll ? 'listingAll' : 'listing', {
                    count: group.count.val
                  })}
                </ListItem>
              ))}

              {groups.icons.map(group => (
                <ListItem
                  key={group.id}
                  title={group.name}
                  href={`/${group.id}`}
                  icon={<group.icon />}
                >
                  {t(group.count.isAll ? 'listingAll' : 'listing', {
                    count: group.count.val
                  })}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & {
    icon?: React.ReactNode
  }
>(({ className, title, icon, children, href }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          href={href || '#'}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
        >
          <div className="flex items-center gap-x-4">
            <div className="w-6 h-6">{icon}</div>
            <div className="text-sm font-medium leading-none">{title}</div>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'
