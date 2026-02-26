import { Provider } from '@auth/core/providers'
import Credentials from '@auth/core/providers/credentials'
import { Pool } from '@neondatabase/serverless'
import Google from 'next-auth/providers/google'
import Resend from 'next-auth/providers/resend'

const TEST_USER = {
  email: 'bob@alice.com',
  name: 'Bob Alice',
  image: 'https://avatars.githubusercontent.com/u/67470890?s=200&v=4'
}

const getProviders = (pool: Pool): Provider[] => {
  const providers: Provider[] = [
    Google({ allowDangerousEmailAccountLinking: true }),
    Resend({
      from: 'VCharts.net <verify@vcharts.net>'
    })
  ]

  if (process.env.NODE_ENV === 'development') {
    providers.push(
      Credentials({
        id: 'password',
        name: 'Password',
        credentials: {
          password: { label: 'Password', type: 'password' }
        },
        authorize: async credentials => {
          if (credentials.password !== 'password') return null

          const existing = await pool.query(
            `SELECT id FROM users WHERE email = $1 LIMIT 1`,
            [TEST_USER.email]
          )
          if (existing.rows.length > 0) {
            return { id: String(existing.rows[0].id), ...TEST_USER }
          }
          const inserted = await pool.query(
            `INSERT INTO users (name, email, image) VALUES ($1, $2, $3) RETURNING id`,
            [TEST_USER.name, TEST_USER.email, TEST_USER.image]
          )
          return { id: String(inserted.rows[0].id), ...TEST_USER }
        }
      })
    )
  }

  return providers
}

export default getProviders
