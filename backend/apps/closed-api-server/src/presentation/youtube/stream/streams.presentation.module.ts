import { Module } from '@nestjs/common'
import { StreamsController } from '@presentation/youtube/stream/streams.controller'
import { YoutubeAppModule } from '@app/youtube/youtube.app.module'

@Module({
  imports: [YoutubeAppModule],
  controllers: [StreamsController],
  providers: []
})
export class StreamsPresentationModule {}
