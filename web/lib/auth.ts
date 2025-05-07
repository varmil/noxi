import NeonAdapter from '@auth/neon-adapter'
import { Pool } from '@neondatabase/serverless'
import NextAuth from 'next-auth'
import Resend from 'next-auth/providers/resend'

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
    providers: [
      {
        ...Resend({
          from: 'PeakX.net <verify@peakx.net>'
        }),
        name: 'Email'
      }
    ],
    session: {
      strategy: 'jwt'
    }
  }
})
