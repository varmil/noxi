import { Module } from '@nestjs/common'
import { GroupRegistrationsService } from '@app/group-registrations/group-registrations.service'
import { GroupInfraModule } from '@infra/group/group.infra.module'
import { GroupRegistrationInfraModule } from '@infra/group-registration/group-registration.infra.module'

@Module({
  imports: [GroupInfraModule, GroupRegistrationInfraModule],
  providers: [GroupRegistrationsService],
  exports: [
    GroupInfraModule,
    GroupRegistrationInfraModule,
    GroupRegistrationsService
  ]
})
export class GroupRegistrationsAppModule {}
