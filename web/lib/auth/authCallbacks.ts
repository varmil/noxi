import jwt from 'jsonwebtoken'
import { NextAuthConfig } from 'next-auth'

const REFRESH_INTERVAL = 300 // TODO: 本番では変える

const callbacks: NextAuthConfig['callbacks'] = {
  async jwt({ token, trigger, user, session }) {
    const now = Math.floor(Date.now() / 1000)

    // ログイン時
    if (user) {
      return {
        ...token,
        jwtForNestJS: jwt.sign(
          { sub: user.id, email: user.email, name: user.name },
          process.env.AUTH_SECRET
        ),
        id: user?.id,
        lastUsed: now
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

export default callbacks
