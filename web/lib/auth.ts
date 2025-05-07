import { Provider } from '@auth/core/providers'
import Credentials from '@auth/core/providers/credentials'
import NeonAdapter from '@auth/neon-adapter'
import { Pool } from '@neondatabase/serverless'
import NextAuth from 'next-auth'
import Resend from 'next-auth/providers/resend'

const providers: Provider[] = [
  {
    ...Resend({ from: 'PeakX.net <verify@peakx.net>' }),
    name: 'Email'
  }
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
      strategy: 'jwt'
    }
  }
})
