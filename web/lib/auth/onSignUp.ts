'use server'

import { Pool } from '@neondatabase/serverless'
import { User } from 'next-auth'
import { Resend } from 'resend'
import { WelcomeEmail } from 'components/emails/welcome-mail'
import { initCheerTicket } from 'lib/auth/initCheerTicket'
import { initUser } from 'lib/auth/initUser'
import { initUsername } from 'lib/auth/initUsername'

export const onSignUp = async (pool: Pool, user: User) => {
  const resend = new Resend(process.env.AUTH_RESEND_KEY)
  const { id, email } = user
  if (!id) {
    throw new Error('User ID is missing')
  }

  const { name, image } = await initUser(pool, id, user.name, user.image)
  await Promise.all([
    initUsername(pool, id),

    initCheerTicket(pool, id),

    email &&
      resend.emails.send({
        from: 'PeakX.net <noreply@peakx.net>',
        to: [email],
        subject: 'PeakXへようこそ！',
        react: WelcomeEmail({ username: name, userEmail: email })
      })
  ])

  return {
    name,
    image
  }
}
