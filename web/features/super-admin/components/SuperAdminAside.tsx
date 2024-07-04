import { Link } from 'lib/navigation'
import {
  Package2Icon,
  InboxIcon,
  CalendarIcon,
  SettingsIcon
} from 'lucide-react'

export function SuperAdminAside() {
  return (
    <aside className="bg-background border-r border-border p-4 flex flex-col gap-4">
      <Link
        href="#"
        className="flex items-center gap-2 font-semibold"
        prefetch={false}
      >
        <Package2Icon className="h-6 w-6" />
        <span>Admin Dashboard</span>
      </Link>
      <nav className="flex flex-col gap-2">
        <Link
          href="#"
          className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-colors"
          prefetch={false}
        >
          <InboxIcon className="h-5 w-5" />
          <span>Requests</span>
        </Link>
        <Link
          href="#"
          className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-colors"
          prefetch={false}
        >
          <CalendarIcon className="h-5 w-5" />
          <span>History</span>
        </Link>
        <Link
          href="#"
          className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-colors"
          prefetch={false}
        >
          <SettingsIcon className="h-5 w-5" />
          <span>Settings</span>
        </Link>
      </nav>
    </aside>
  )
}
