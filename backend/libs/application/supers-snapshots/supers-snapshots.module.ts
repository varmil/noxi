import { Module } from '@nestjs/common'
import { SupersSnapshotsService } from '@app/supers-snapshots/supers-snapshots.service'
import { SupersSnapshotInfraModule } from '@infra/supers-snapshot/supers-snapshot.infra.module'

@Module({
  imports: [SupersSnapshotInfraModule],
  providers: [SupersSnapshotsService],
  exports: [SupersSnapshotInfraModule, SupersSnapshotsService]
})
export class SupersSnapshotsAppModule {}
