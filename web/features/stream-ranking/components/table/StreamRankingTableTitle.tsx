import { PropsWithChildren } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'components/styles/Image'
import { Link } from 'lib/navigation'

type Props = PropsWithChildren<{
  className?: string
  showViewAll?: boolean
}>

export default function StreamRankingTableTitle({
  className,
  showViewAll
}: Props) {
  const t = useTranslations('Features.streamRanking')
  return (
    <section className={`${className || ''}`}>
      <div className={`flex flex-row gap-x-1 items-center`}>
        <div className="flex gap-x-2 items-center text-balance text-lg sm:text-xl">
          <Image
            src={'/youtube/yt_icon_rgb.png'}
            alt="YouTube"
            width={32}
            height={22.5}
            className="relative w-8 h-[22.5px] top-[0.5px]"
          />
          {t('ranking')}
        </div>
        {showViewAll && (
          <Button asChild size="sm" className="ml-auto gap-1">
            <Link href="/youtube/live">
              {t('viewAll')}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        )}
      </div>
    </section>
  )
}
