import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MainScenario } from 'apps/bundle-supers/src/scenario/main.scenario'
import { LibAppModule } from '@app/lib/lib.app.module'
import { SuperChatsModule } from '@app/super-chats/super-chats.module'
import { SuperStickersModule } from '@app/super-stickers/super-stickers.module'
import { SupersBundleQueuesModule } from '@app/supers-bundle-queues/supers-bundle-queues.module'

@Module({
  imports: [
    // in only Local, load .env , in other environments, directly embed with Cloud Run
    ConfigModule.forRoot({ ignoreEnvFile: !!process.env.ENV_NAME }),
    LibAppModule,
    SupersBundleQueuesModule,
    SuperChatsModule,
    SuperStickersModule
  ],
  providers: [MainScenario]
})
export class MainModule {}
