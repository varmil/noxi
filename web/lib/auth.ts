import NeonAdapter from '@auth/neon-adapter'
import { Pool } from '@neondatabase/serverless'
import NextAuth from 'next-auth'
import providers from 'lib/auth/authProviders'
import callbacks from './auth/authCallbacks'

const SESSION_MAX_AGE = 30 * 24 * 3600 // 30日

export const { handlers, signIn, signOut, auth, unstable_update } = NextAuth(
  () => {
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
        maxAge: SESSION_MAX_AGE
      },

      callbacks: callbacks(pool),
      trustHost: true // for [auth][error] UntrustedHost: Host must be trusted.
    }
  }
)
