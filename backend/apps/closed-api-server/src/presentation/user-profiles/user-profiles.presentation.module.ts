import { Module } from '@nestjs/common'
import { AuthModule } from '@presentation/nestjs/guard/auth/auth.module'
import { UsersController } from '@presentation/users/users.controller'
import { UsersAppModule } from '@app/users/users.app.module'

@Module({
  imports: [AuthModule, UsersAppModule],
  controllers: [UsersController],
  providers: []
})
export class UsersPresentationModule {}
