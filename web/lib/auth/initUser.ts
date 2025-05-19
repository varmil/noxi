import { randomUUID } from 'crypto'
import { Pool } from '@neondatabase/serverless'
import { MAX_NAME_LENGTH } from 'features/dashboard/profile/hooks/useProfileSchema'
import { getWebUrl } from 'utils/web-url'

/**
 * Initialize user
 * @returns generated name and image
 */
export async function initUser(
  pool: Pool,
  id: string,
  name?: string | null,
  image?: string | null
) {
  const fallbackName =
    name?.trim().slice(0, MAX_NAME_LENGTH - 1) ||
    `User_${randomUUID().slice(0, 8)}`
  const fallbackImage = image || `${getWebUrl()}/placeholder-user.jpg`
  await pool.query('UPDATE users SET name = $1, image = $2 WHERE id = $3', [
    fallbackName,
    fallbackImage,
    id
  ])
  return {
    name: fallbackName,
    image: fallbackImage
  }
}
