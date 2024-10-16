import { Module } from '@nestjs/common'
import { SupersController } from '@presentation/supers/supers.controller'
import { SuperChatsModule } from '@app/super-chats/super-chats.module'
import { SuperStickersModule } from '@app/super-stickers/super-stickers.module'

@Module({
  imports: [SuperChatsModule, SuperStickersModule],
  controllers: [SupersController],
  providers: []
})
export class SupersPresentationModule {}
