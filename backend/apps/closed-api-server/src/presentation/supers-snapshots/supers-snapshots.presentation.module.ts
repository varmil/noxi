import { Module } from '@nestjs/common'
import { SupersSnapshotsController } from '@presentation/supers-snapshots/supers-snapshots.controller'
import { SupersSnapshotsScenario } from '@presentation/supers-snapshots/supers-snapshots.scenario'
import { SupersSnapshotsAppModule } from '@app/supers-snapshots/supers-snapshots.module'

@Module({
  imports: [SupersSnapshotsAppModule],
  controllers: [SupersSnapshotsController],
  providers: [SupersSnapshotsScenario]
})
export class SupersSnapshotsPresentationModule {}
