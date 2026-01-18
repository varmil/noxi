import { Card, CardContent } from '@/components/ui/card'
import { Link } from 'lib/navigation'

type FeaturedItem = {
  id: string
  title: string
  href: string
}

type Props = {
  title: string
  items: FeaturedItem[]
}

export default function FeaturedSection({ title, items }: Props) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold text-foreground mb-3">{title}</h2>
      <div className="grid grid-cols-3 gap-2">
        {items.map(item => (
          <Link key={item.id} href={item.href} prefetch={false}>
            <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/50">
              <CardContent className="p-2 sm:p-3">
                <h3 className="text-xs sm:text-sm font-medium text-center text-foreground">
                  {item.title}
                </h3>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
