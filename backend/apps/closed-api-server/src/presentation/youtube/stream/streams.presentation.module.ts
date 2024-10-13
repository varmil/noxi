import { Module } from '@nestjs/common'
import { StreamsController } from '@presentation/youtube/stream/streams.controller'
import { StreamsModule } from '@app/streams/streams.module'

@Module({
  imports: [StreamsModule],
  controllers: [StreamsController],
  providers: []
})
export class StreamsPresentationModule {}
