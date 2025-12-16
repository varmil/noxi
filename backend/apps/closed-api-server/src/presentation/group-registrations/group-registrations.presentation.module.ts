import { Module } from '@nestjs/common'
import { GroupRegistrationsController } from '@presentation/group-registrations/group-registrations.controller'
import { GroupRegistrationsAppModule } from '@app/group-registrations/group-registrations.app.module'

@Module({
  imports: [GroupRegistrationsAppModule],
  controllers: [GroupRegistrationsController],
  providers: []
})
export class GroupRegistrationsPresentationModule {}
