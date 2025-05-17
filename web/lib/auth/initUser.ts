import { randomUUID } from 'crypto'
import { Pool } from '@neondatabase/serverless'
import { getWebUrl } from 'utils/web-url'

export async function initUser(
  pool: Pool,
  id: string,
  name?: string | null,
  image?: string | null
) {
  const fallbackName = name || `User_${randomUUID().slice(0, 8)}`
  const fallbackImage = image || `${getWebUrl()}/placeholder-user.jpg`
  await pool.query('UPDATE users SET name = $1, image = $2 WHERE id = $3', [
    fallbackName,
    fallbackImage,
    id
  ])
}
