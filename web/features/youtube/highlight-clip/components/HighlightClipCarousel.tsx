import * as React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { VideosSchema } from 'api/youtube/schema/videoSchema'
import ShortsCard from 'features/youtube/shorts/ShortsCard'

type Props = {
  videos: VideosSchema
}

export function HighlightClipCarousel({
  videos
}: React.PropsWithoutRef<Props>) {
  return (
    <Carousel
      opts={{
        align: 'start',
        dragFree: true
      }}
      className="w-full max-w-fit"
    >
      <CarouselContent className="-ml-1.5 sm:-ml-3 md:-ml-5">
        {videos.map(video => (
          <CarouselItem
            key={video.id}
            className="pl-1.5 sm:pl-3 md:pl-5 basis-1/2 sm:basis-1/4 md:basis-1/5"
          >
            <ShortsCard {...video} />
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  )
}
