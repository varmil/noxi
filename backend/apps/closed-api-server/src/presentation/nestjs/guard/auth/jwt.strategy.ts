import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UsersService } from '@app/users/users.service'
import { User, UserId } from '@domain/user'

interface JwtPayload {
  sub: string // `sub` がユーザーIDとして使われる
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.AUTH_SECRET || '' // Auth.jsと同じキー
    })
  }

  async validate(payload: JwtPayload): Promise<User> {
    const user = await this.usersService.findById(new UserId(payload.sub))
    if (!user) {
      throw new UnauthorizedException('User not found')
    }
    return user
  }
}
