import { Module } from '@nestjs/common'
import { UsersAppModule } from '@app/users/users.app.module'
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [UsersAppModule],
  providers: [JwtStrategy],
  exports: [JwtStrategy, UsersAppModule]
})
export class AuthModule {}
