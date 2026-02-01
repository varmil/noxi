'use server'

import { Pool } from '@neondatabase/serverless'
import { User } from 'next-auth'
import { Resend } from 'resend'
import { WelcomeEmail } from 'components/emails/welcome-mail'
import { initNormalizedEmail } from 'lib/auth/init/initNormalizedEmail'
import { initUser } from 'lib/auth/init/initUser'
import { initUsername } from 'lib/auth/init/initUsername'

export const onSignUp = async (pool: Pool, user: User) => {
  const resend = new Resend(process.env.AUTH_RESEND_KEY)
  const { id, email } = user
  if (!id) {
    throw new Error('User ID is missing')
  }

  const { name, image } = await initUser(pool, id, user.name, user.image)

  await initNormalizedEmail(pool, id, email)

  await Promise.all([
    initUsername(pool, id),

    // TODO: HyperChat ticket distribution will be added in Phase 4

    email &&
      resend.emails.send({
        from: 'VCharts.net <noreply@vcharts.net>',
        to: [email],
        subject: 'VChartsへようこそ！',
        react: WelcomeEmail({ username: name, userEmail: email })
      })
  ])

  return {
    name,
    image
  }
}
