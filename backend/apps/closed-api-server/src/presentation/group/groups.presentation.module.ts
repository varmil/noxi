import { Module } from '@nestjs/common'
import { ChartsController } from '@presentation/group/charts.controller'
import { GroupsAppModule } from '@app/groups/groups.app.module'
import { GroupsController } from '@presentation/group/groups.controller'

@Module({
  imports: [GroupsAppModule],
  controllers: [ChartsController, GroupsController],
  providers: []
})
export class GroupsPresentationModule {}
