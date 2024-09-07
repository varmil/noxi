import { Module } from '@nestjs/common'
import { ChartsController } from '@presentation/group/charts.controller'
import { GroupsController } from '@presentation/group/groups.controller'
import { GroupsAppModule } from '@app/groups/groups.app.module'

@Module({
  imports: [GroupsAppModule],
  controllers: [ChartsController, GroupsController],
  providers: []
})
export class GroupsPresentationModule {}
