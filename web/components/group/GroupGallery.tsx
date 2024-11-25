import * as React from 'react'
import { useTranslations } from 'next-intl'
import { NavigationMenuLink } from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import Image from 'components/styles/Image'
import useGroups from 'hooks/useGroups'
import { Link } from 'lib/navigation'

type Props = {
  className?: string
  useNavigationMenuLink?: boolean
}

export default function GroupGallery({
  className,
  useNavigationMenuLink = false
}: Props) {
  const t = useTranslations('Components.group')
  const groups = useGroups()

  return (
    <ul className={`${className || ''}`}>
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
          useNavigationMenuLink={useNavigationMenuLink}
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
          useNavigationMenuLink={useNavigationMenuLink}
        >
          {t(group.count.isAll ? 'listingAll' : 'listing', {
            count: group.count.val
          })}
        </ListItem>
      ))}
    </ul>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & {
    icon?: React.ReactNode
    useNavigationMenuLink?: boolean
  }
>(({ className, title, icon, children, href, useNavigationMenuLink }, ref) => {
  const Component = ({ children }) =>
    useNavigationMenuLink ? (
      <NavigationMenuLink asChild>{children}</NavigationMenuLink>
    ) : (
      <>{children}</>
    )

  return (
    <li>
      <Component>
        <Link
          ref={ref}
          href={href || '#'}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          prefetch={true}
        >
          <div className="flex items-center gap-x-4">
            <div className="w-6 h-6">{icon}</div>
            <div className="font-medium leading-none">{title}</div>
          </div>
          <p className="line-clamp-2 leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </Component>
    </li>
  )
})
ListItem.displayName = 'ListItem'
