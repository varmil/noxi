import * as React from 'react'
import { useTranslations } from 'next-intl'
import { NavigationMenuLink } from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import Image from 'components/styles/Image'
import { GroupSchema } from 'apis/groups'
import { Link } from 'lib/navigation'

type Props = {
  className?: string
  useNavigationMenuLink?: boolean
  groups: GroupSchema[]
}

export default function GroupGalleryWithAPI({
  className,
  useNavigationMenuLink = false,
  groups
}: Props) {
  const t = useTranslations('Components.group')

  return (
    <ul className={`${className || ''}`}>
      {groups.map(group => (
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
        >
          {/* カウント情報はAPIから取得していないため、基本的なメッセージを表示 */}
          {t('listing', { count: '0' })}
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
            'block select-none space-y-1 rounded p-3 leading-none no-underline outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          prefetch={false}
        >
          <div className="flex items-center gap-x-4">
            <div className="w-6 h-6 ">{icon}</div>
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
