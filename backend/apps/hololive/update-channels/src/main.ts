import { NestFactory } from '@nestjs/core'
import { UpdateChannelsScenario } from 'apps/hololive/update-channels/src/update-channels.scenario'
import { UpdateChannelsModule } from './update-channels.module'

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(UpdateChannelsModule)

  // チャンネル基本情報のUPSERT
  {
    const updateChannelsScenario = app
      .select(UpdateChannelsModule)
      .get(UpdateChannelsScenario)
    await updateChannelsScenario.execute()
  }

  // TODO: AggregationのUPSERT

  // {
  //   const channelsScenario = app.select(YoutubeAppModule).get(ChannelsScenario)
  //   const videos = await channelsScenario.getVideosInChannel({
  //     where: { channelId: new ChannelId('UC-hM6YJuNYVAmUWxeIr9FeA') }
  //   })
  //   console.log(videos.items.map(e => e.snippet.title))
  // }

  await app.close()
}
bootstrap().catch(reason => console.error(reason))
