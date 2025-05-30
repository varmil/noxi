import { Session } from 'next-auth'
import { useTranslations } from 'next-intl'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Link } from 'lib/navigation'

export default function UserDropdown({ session }: { session: Session }) {
  const comp = useTranslations('Components.header')
  const { user } = session
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="cursor-pointer transition-transform duration-75 hover:scale-110"
      >
        <Avatar className="size-8">
          <AvatarImage
            src={user?.image ?? '/placeholder.svg'}
            width={64}
            height={64}
            alt="Avatar"
          />
          <AvatarFallback>{user?.email ?? user?.name}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <div className="line-clamp-1 break-all">{user?.name}</div>
          <div className="text-muted-foreground line-clamp-1 break-all">
            {user?.email}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/dashboard">{comp('dashboard')}</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
