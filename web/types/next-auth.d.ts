import { type DefaultSession } from 'next-auth'
import { type DefaultUser } from 'next-auth'
import { type DefaultJWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      jwtForNestJS: string
    } & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    jwtForNestJS: string
  }
}
