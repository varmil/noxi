import { PropsWithoutRef } from 'react'
import { List } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'lib/navigation'

export default function StreamListFooter({
  href
}: PropsWithoutRef<{ href: string }>) {
  return (
    <section>
      <Button asChild variant="outline" className="w-full">
        <Link href={href}>
          <List className="mr-2 h-4 w-4" /> Go to full list
        </Link>
      </Button>
    </section>
  )
}
