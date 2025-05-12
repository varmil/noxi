import { Module } from '@nestjs/common'
import { UserProfilesService } from '@app/user-profiles/user-profiles.service'
import { UserInfraModule } from '@infra/user/user.infra.module'
import { UserProfileInfraModule } from '@infra/user-profile/user-profile.infra.module'

@Module({
  imports: [UserInfraModule, UserProfileInfraModule],
  providers: [UserProfilesService],
  exports: [UserInfraModule, UserProfileInfraModule, UserProfilesService]
})
export class UserProfilesAppModule {}
