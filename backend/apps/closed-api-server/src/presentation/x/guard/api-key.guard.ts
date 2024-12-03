import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException
} from '@nestjs/common'
import type { Request } from 'express'

@Injectable()
export class ApiKeyGuard implements CanActivate {
  private readonly apiKey: string

  constructor() {
    this.apiKey = process.env.X_POST_KEY ?? ''
  }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>()

    if (request.headers['x-api-key'] === this.apiKey) {
      return true
    }

    throw new UnauthorizedException('Invalid API Key')
  }
}
