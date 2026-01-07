import * as React from 'react'
import { NavigationMenuLink } from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import Image from 'components/styles/Image'
import { Link } from 'lib/navigation'
import { getIcon, isIcon } from 'utils/group'
import type { GroupsSchema } from 'apis/groups'

type Props = {
  className?: string
  groups: GroupsSchema
  useNavigationMenuLink?: boolean
}

export default function GroupGallery({
  className,
  groups,
  useNavigationMenuLink = false
}: Props) {
  return (
    <ul className={`${className || ''}`}>
      {groups.map(group =>
        !isIcon(group) ? (
          <ListItem
            key={group.id}
            title={group.name}
            href={`/${group.id}`}
            icon={
              <Image
                src={group.iconSrc}
                alt={`${group.name} icon`}
                width={100}
                height={100}
                className={`rounded-full`}
              />
            }
            useNavigationMenuLink={useNavigationMenuLink}
          />
        ) : (
          (() => {
            const Icon = getIcon(group)
            return (
              <ListItem
                key={group.id}
                title={group.name}
                href={`/${group.id}`}
                icon={<Icon className="size-6 text-foreground" />}
                useNavigationMenuLink={useNavigationMenuLink}
              />
            )
          })()
        )
      )}
    </ul>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & {
    icon?: React.ReactNode
    useNavigationMenuLink?: boolean
  }
>(({ className, title, icon, href, useNavigationMenuLink }, ref) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) =>
    useNavigationMenuLink ? (
      <NavigationMenuLink asChild>{children}</NavigationMenuLink>
    ) : (
      <>{children}</>
    )

  return (
    <li>
      <Wrapper>
        <Link
          ref={ref}
          href={href || '#'}
          className={cn(
            'block select-none space-y-1 rounded p-3 leading-none no-underline outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          prefetch={false}
        >
          <div className="flex items-center gap-x-4">
            <div className="w-6 h-6 ">{icon}</div>
            <div className="font-medium leading-none">{title}</div>
          </div>
        </Link>
      </Wrapper>
    </li>
  )
})
ListItem.displayName = 'ListItem'
