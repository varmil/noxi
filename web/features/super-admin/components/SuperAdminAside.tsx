import { Package2Icon, InboxIcon, TvIcon } from 'lucide-react'
import { Link } from 'lib/navigation'

export function SuperAdminAside() {
  return (
    <aside className="bg-background border-r border-border p-4 flex flex-col gap-4">
      <Link
        href="/super-admin"
        className="flex items-center gap-2 font-semibold"
        prefetch={false}
      >
        <Package2Icon className="h-6 w-6" />
        <span>管理ダッシュボード</span>
      </Link>
      <nav className="flex flex-col gap-2">
        <Link
          href="/super-admin/group-registrations"
          className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-colors"
          prefetch={false}
        >
          <InboxIcon className="h-5 w-5" />
          <span>Group申請管理</span>
        </Link>
        <Link
          href="/super-admin/channel-registrations"
          className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-colors"
          prefetch={false}
        >
          <TvIcon className="h-5 w-5" />
          <span>Channel申請管理</span>
        </Link>
      </nav>
    </aside>
  )
}
