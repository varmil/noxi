import { Provider } from '@auth/core/providers'
import Credentials from '@auth/core/providers/credentials'
import NeonAdapter from '@auth/neon-adapter'
import { Pool } from '@neondatabase/serverless'
import NextAuth, { NextAuthConfig } from 'next-auth'
import Google from 'next-auth/providers/google'
// import Resend from 'next-auth/providers/resend'

const providers: Provider[] = [
  Google
  // {
  //   ...Resend({ from: 'PeakX.net <verify@peakx.net>' }),
  //   name: 'Email'
  // }
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
    session: {
      strategy: 'jwt',
      maxAge: 3600 // TODO: 本番では変える
    },
    callbacks
  }
})

const REFRESH_INTERVAL = 300 // TODO: 本番では変える

const callbacks: NextAuthConfig['callbacks'] = {
  async jwt({ token, user, account }) {
    const now = Math.floor(Date.now() / 1000)

    // 初回ログイン時（userがいる）
    if (user || account) {
      return {
        ...token,
        lastUsed: now
      }
    }

    // トークンの使用履歴が古いなら延長（再発行）
    const lastUsed = (token.lastUsed as number) ?? now
    if (now - lastUsed > REFRESH_INTERVAL) {
      token.lastUsed = now
    }

    return token
  }
}
