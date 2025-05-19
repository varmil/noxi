import { Pool } from '@neondatabase/serverless'
import jwt from 'jsonwebtoken'
import { NextAuthConfig, User } from 'next-auth'
import { initUser } from 'lib/auth/initUser'
import { initUsername } from 'lib/auth/initUsername'

const REFRESH_INTERVAL = 300 // TODO: 本番では変える

const callbacks = (pool: Pool): NextAuthConfig['callbacks'] => {
  return {
    async jwt({ token, trigger, user, session }) {
      const now = Math.floor(Date.now() / 1000)

      // ログイン or 新規登録
      if (user) {
        if (trigger === 'signUp') {
          const { name, image } = await onSignUp(pool, user)
          token = { ...token, name, picture: image }
        }
        return {
          ...token,
          ...getSignInToken(user.id, now)
        }
      }

      // unstable_update() によって更新された時
      if (trigger === 'update') {
        const { name, image } = session.user
        return {
          ...token,
          name,
          ...(image ? { picture: image } : {})
        }
      }

      // トークンの使用履歴が古いなら延長（再発行）
      const lastUsed = (token.lastUsed as number) ?? now
      if (now - lastUsed > REFRESH_INTERVAL) {
        token.lastUsed = now
      }

      return token
    },

    session({ session, token }) {
      // id は int だが、Auth.jsの定義が間違っているため
      // 仕方なくアサーションしている
      session.user.id = token.id as string
      session.user.jwtForNestJS = token.jwtForNestJS
      return session
    }
  }
}

const onSignUp = async (pool: Pool, user: User) => {
  const { id } = user
  if (!id) {
    throw new Error('User ID is missing')
  }

  const { name, image } = await initUser(pool, id, user.name, user.image)
  await initUsername(pool, id)

  return {
    name,
    image
  }
}

const getSignInToken = (userId: string | undefined, now: number) => {
  if (!userId) {
    throw new Error('User ID is missing')
  }
  return {
    id: userId,
    jwtForNestJS: jwt.sign({ sub: userId }, process.env.AUTH_SECRET),
    lastUsed: now
  }
}

export default callbacks
