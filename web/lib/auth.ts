import NeonAdapter from '@auth/neon-adapter'
import { Pool } from '@neondatabase/serverless'
import NextAuth from 'next-auth'
import providers from 'lib/auth/authProviders'
import { initUser } from 'lib/auth/initUser'
import { initUsername } from 'lib/auth/initUsername'
import callbacks from './auth/authCallbacks'

const SESSION_MAX_AGE = 3600 // TODO: 本番では変える

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

      callbacks,

      events: {
        async createUser(message) {
          const { id, name, image } = message.user
          if (!id) {
            throw new Error('User ID is missing')
          }
          await initUser(pool, id, name, image)
          await initUsername(pool, id)
        }
      }
    }
  }
)
