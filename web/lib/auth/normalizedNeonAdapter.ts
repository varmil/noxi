import { Adapter, AdapterUser, VerificationToken } from '@auth/core/adapters'
import NeonAdapter from '@auth/neon-adapter'
import { Pool } from '@neondatabase/serverless'
import { normalizeEmail } from './normalizeEmail'

/**
 * NeonAdapter をラップして、メールアドレスの正規化を行う
 *
 * - createUser: normalizedEmail カラムに正規化したメールを保存
 * - getUserByEmail: normalizedEmail で検索し、異なるエイリアスでサインインした場合は email を更新
 * - updateUser: normalizedEmail も一緒に更新
 * - createVerificationToken: identifier を正規化して保存
 * - useVerificationToken: identifier を正規化して検索
 */
export function NormalizedNeonAdapter(pool: Pool): Adapter {
  const baseAdapter = NeonAdapter(pool)

  return {
    ...baseAdapter,

    async createVerificationToken(
      verificationToken: VerificationToken
    ): Promise<VerificationToken> {
      const { identifier, expires, token } = verificationToken
      const normalizedIdentifier = normalizeEmail(identifier)

      console.log('[NormalizedNeonAdapter] createVerificationToken:', {
        originalIdentifier: identifier,
        normalizedIdentifier
      })

      const sql = `
        INSERT INTO verification_token (identifier, expires, token)
        VALUES ($1, $2, $3)`
      await pool.query(sql, [normalizedIdentifier, expires, token])

      return { ...verificationToken, identifier: normalizedIdentifier }
    },

    async useVerificationToken({
      identifier,
      token
    }: {
      identifier: string
      token: string
    }): Promise<VerificationToken | null> {
      const normalizedIdentifier = normalizeEmail(identifier)

      console.log('[NormalizedNeonAdapter] useVerificationToken:', {
        originalIdentifier: identifier,
        normalizedIdentifier
      })

      const sql = `
        DELETE FROM verification_token
        WHERE identifier = $1 AND token = $2
        RETURNING identifier, expires, token`
      const result = await pool.query(sql, [normalizedIdentifier, token])

      console.log('[NormalizedNeonAdapter] useVerificationToken result:', {
        found: result.rowCount !== 0,
        returnedIdentifier: result.rows[0]?.identifier
      })

      return result.rowCount !== 0 ? result.rows[0] : null
    },

    async createUser(
      user: Omit<AdapterUser, 'id'>
    ): Promise<AdapterUser & { normalizedEmail?: string | null }> {
      const { name, email, emailVerified, image } = user
      const normalizedEmailValue = email ? normalizeEmail(email) : null

      const sql = `
        INSERT INTO users (name, email, "normalizedEmail", "emailVerified", image)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, name, email, "normalizedEmail", "emailVerified", image`

      const result = await pool.query(sql, [
        name,
        email,
        normalizedEmailValue,
        emailVerified,
        image
      ])

      return result.rows[0]
    },

    async getUserByEmail(
      email: string
    ): Promise<(AdapterUser & { normalizedEmail?: string | null }) | null> {
      const normalizedEmailValue = normalizeEmail(email)

      console.log('[NormalizedNeonAdapter] getUserByEmail:', {
        originalEmail: email,
        normalizedEmail: normalizedEmailValue
      })

      const sql = `SELECT * FROM users WHERE "normalizedEmail" = $1`
      const result = await pool.query(sql, [normalizedEmailValue])

      if (result.rowCount === 0) return null

      const user = result.rows[0]

      // サインインに使用されたメールアドレスが保存されているものと異なる場合、
      // ユーザーの希望するフォーマットに更新する（normalizedEmail は同じなので一意性は保たれる）
      // これにより Auth.js の Verification 比較エラーも解消される
      if (user.email !== email) {
        const updateSql = `UPDATE users SET email = $1 WHERE id = $2 RETURNING *`
        const updateResult = await pool.query(updateSql, [email, user.id])
        return updateResult.rows[0]
      }

      return user
    },

    async updateUser(
      user: Partial<AdapterUser> & Pick<AdapterUser, 'id'>
    ): Promise<AdapterUser & { normalizedEmail?: string | null }> {
      const fetchSql = `SELECT * FROM users WHERE id = $1`
      const query1 = await pool.query(fetchSql, [user.id])
      const oldUser = query1.rows[0]

      const newUser = {
        ...oldUser,
        ...user
      }

      const { id, name, email, emailVerified, image } = newUser
      const normalizedEmailValue = email ? normalizeEmail(email) : null

      const updateSql = `
        UPDATE users SET
        name = $2, email = $3, "normalizedEmail" = $4, "emailVerified" = $5, image = $6
        WHERE id = $1
        RETURNING id, name, email, "normalizedEmail", "emailVerified", image
      `

      const query2 = await pool.query(updateSql, [
        id,
        name,
        email,
        normalizedEmailValue,
        emailVerified,
        image
      ])

      return query2.rows[0]
    }
  }
}
