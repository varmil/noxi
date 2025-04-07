import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import {
  GridCardGalleryContainer,
  GridCardGalleryContent
} from 'components/styles/GridCardContainer'

export default function StreamGallerySkeleton({
  className
}: {
  className?: string
}) {
  return (
    <section className={`py-6 ${className}`}>
      <section className="px-0 pb-6">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6" /> {/* アイコン用のSkeleton */}
            <Skeleton className="h-6 w-32" /> {/* タイトル用のSkeleton */}
          </div>
          <Skeleton className="sm:hidden h-6 w-14" /> {/* Badge用のSkeleton */}
        </CardTitle>
      </section>
      <GridCardGalleryContainer>
        <GridCardGalleryContent force1Row={true}>
          {[1, 2, 3, 4].map((_, index) => (
            <Card
              key={index}
              className="pt-0 pb-4 gap-0 cursor-pointer hover:bg-accent/50"
            >
              <CardContent className="pl-0 pr-4 flex gap-2">
                <Skeleton className="w-[clamp(200px,60%,400px)] aspect-video rounded-tl-xl overflow-hidden" />
                <div className="flex-1 pt-2">
                  <Skeleton className="h-10 w-full mb-2" /> {/* Title */}
                  <Skeleton className="h-4 w-[80%] mb-0.5" /> {/* Channel */}
                  <Skeleton className="h-4 w-[80%]" /> {/* Watching */}
                </div>
              </CardContent>
              <CardFooter
                className={`flex-1 pl-2 pr-4 border-t pt-4! flex justify-between gap-4`}
              >
                <Skeleton className="h-full flex-1" /> {/* Comment */}
                <Separator orientation="vertical" />
                <Skeleton className="h-10 w-[72px]" /> {/* Super Chat */}
              </CardFooter>
            </Card>
          ))}
        </GridCardGalleryContent>
      </GridCardGalleryContainer>
    </section>
  )
}
