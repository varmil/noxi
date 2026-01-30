import { Provider } from '@auth/core/providers'
import Credentials from '@auth/core/providers/credentials'
import Google from 'next-auth/providers/google'
import Resend from 'next-auth/providers/resend'

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

export default providers
