import { Module } from '@nestjs/common'
import { UsersService } from '@app/users/users.service'
import { UserInfraModule } from '@infra/user/user.infra.module'

@Module({
  imports: [UserInfraModule],
  providers: [UsersService],
  exports: [UserInfraModule, UsersService]
})
export class UsersAppModule {}
