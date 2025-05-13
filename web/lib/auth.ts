import { randomUUID } from 'crypto'
import { Provider } from '@auth/core/providers'
import Credentials from '@auth/core/providers/credentials'
import NeonAdapter from '@auth/neon-adapter'
import { Pool } from '@neondatabase/serverless'
import jwt from 'jsonwebtoken'
import NextAuth, { NextAuthConfig } from 'next-auth'
import Apple from 'next-auth/providers/apple'
import Google from 'next-auth/providers/google'
import Resend from 'next-auth/providers/resend'
import { getWebUrl } from 'utils/web-url'

const providers: Provider[] = [
  Google,
  Apple,
  Resend({ from: 'PeakX.net <verify@peakx.net>' })
]

if (process.env.NODE_ENV === 'development') {
  providers.push(
    Credentials({
      id: 'password',
      name: 'Password',
      credentials: {
        password: { label: 'Password', type: 'password' }
      },
      authorize: credentials => {
        if (credentials.password === 'password') {
          return {
            email: 'bob@alice.com',
            name: 'Bob Alice',
            image: 'https://avatars.githubusercontent.com/u/67470890?s=200&v=4'
          }
        }
        return null
      }
    })
  )
}

export const { handlers, signIn, signOut, auth } = NextAuth(() => {
  // Create a `Pool` inside the request handler.
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })
  return {
    theme: {
      colorScheme: 'light',
      logo: '/peakx/side.black.png',
      brandColor: '#FCAC00',
      buttonText: '#0E0D0C'
    },
    adapter: NeonAdapter(pool),
    providers,
    pages: {
      signIn: '/auth/signin',
      verifyRequest: '/auth/verify-request',
      error: '/auth/error'
    },
    session: {
      strategy: 'jwt',
      maxAge: 3600 // TODO: 本番では変える
    },
    callbacks,

    events: {
      async createUser(message) {
        const { id, email, image, name } = message.user

        const fallbackName = name || `User_${randomUUID().slice(0, 8)}`
        const fallbackImage = image || `${getWebUrl()}/placeholder-user.jpg`

        await pool.query(
          'UPDATE users SET name = $1, image = $2 WHERE id = $3',
          [fallbackName, fallbackImage, id]
        )
      }
    }
  }
})

const REFRESH_INTERVAL = 300 // TODO: 本番では変える

const callbacks: NextAuthConfig['callbacks'] = {
  async jwt({ token, user }) {
    const now = Math.floor(Date.now() / 1000)

    // 初回ログイン時（userがいる）
    if (user) {
      console.log(
        jwt.sign(
          { sub: user.id, email: user.email, name: user.name },
          process.env.AUTH_SECRET
        )
      )
      return {
        ...token,
        jwtForNestJS: jwt.sign(
          { sub: user.id, email: user.email, name: user.name },
          process.env.AUTH_SECRET
        ),
        id: user?.id,
        lastUsed: now
      }
    }

    // トークンの使用履歴が古いなら延長（再発行）
    const lastUsed = (token.lastUsed as number) ?? now
    if (now - lastUsed > REFRESH_INTERVAL) {
      token.lastUsed = now
    }

    return token
  },
  session({ session, token }) {
    // id は int だが、Auth.jsの定義が間違っているため
    // 仕方なくアサーションしている
    session.user.id = token.id as string
    session.user.jwtForNestJS = token.jwtForNestJS
    return session
  }
}
