'use server'

import { Pool } from '@neondatabase/serverless'
import { User } from 'next-auth'
import { Resend } from 'resend'
import { WelcomeEmail } from 'components/emails/welcome-mail'
import { initCheerTicket } from 'lib/auth/init/initCheerTicket'
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

  // normalizedEmail を先に更新（initCheerTicket のチェックで使用するため）
  if (email) {
    await initNormalizedEmail(pool, id, email)
  }

  await Promise.all([
    initUsername(pool, id),

    // チケット配布（normalizedEmail の重複チェック付き）
    initCheerTicket(pool, id),

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
