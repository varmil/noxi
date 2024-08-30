import { Module } from '@nestjs/common'
import { SearchesController } from '@presentation/youtube/searches/searches.controller'
import { YoutubeAppModule } from '@app/youtube/youtube.app.module'

@Module({
  imports: [YoutubeAppModule],
  controllers: [SearchesController],
  providers: []
})
export class SearchesPresentationModule {}
