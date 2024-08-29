import { Module } from '@nestjs/common'
import { GroupsAppModule } from '@app/groups/groups.app.module'
import { SubscribeService } from './subscribe.service'

@Module({
  imports: [GroupsAppModule],
  providers: [SubscribeService],
  exports: [SubscribeService]
})
export class PubsubhubbubModule {}
