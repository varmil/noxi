import { Module } from '@nestjs/common'
import { AuthModule } from '@presentation/nestjs/guard/auth/auth.module'
import { UserProfilesController } from '@presentation/user-profiles/user-profiles.controller'
import { UserProfilesAppModule } from '@app/user-profiles/user-profiles.app.module'

@Module({
  imports: [AuthModule, UserProfilesAppModule],
  controllers: [UserProfilesController],
  providers: []
})
export class UserProfilesPresentationModule {}
