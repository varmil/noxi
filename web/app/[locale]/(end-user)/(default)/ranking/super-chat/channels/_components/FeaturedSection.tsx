import { Clock, Calendar, TrendingUp } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Link } from 'lib/navigation'

type FeaturedItem = {
  id: string
  title: string
  href: string
  icon: 'clock' | 'calendar' | 'trending'
}

type Props = {
  title: string
  items: FeaturedItem[]
}

const iconMap = {
  clock: Clock,
  calendar: Calendar,
  trending: TrendingUp
}

export default function FeaturedSection({ title, items }: Props) {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-bold text-foreground mb-4">{title}</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(item => {
          const Icon = iconMap[item.icon]
          return (
            <Link key={item.id} href={item.href} prefetch={false}>
              <Card className="group cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-primary/50">
                <CardContent className="flex items-center gap-4 p-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
