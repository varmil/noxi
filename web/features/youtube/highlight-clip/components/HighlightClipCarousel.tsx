import * as React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel'
import { VideosSchema } from 'apis/youtube/schema/videoSchema'
import ShortsCard from 'features/youtube/shorts/ShortsCard'

type Props = {
  videos: VideosSchema
}

/** @deprecated */
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
      <CarouselContent className="-ml-1.5 sm:-ml-2 md:-ml-3">
        {videos.map(video => (
          <CarouselItem
            key={video.id}
            className="pl-1.5 sm:pl-2 md:pl-3 basis-5/12 sm:basis-[31%] md:basis-[18%]"
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
