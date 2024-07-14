import dayjs from 'dayjs'
import { firestore } from 'firebase-admin'

/**
 * now() + 30 days
 * @returns Timestamp added 30 days
 */
export const getExpireAt = (): firestore.Timestamp => {
  const now = firestore.Timestamp.now().toDate()
  const date = dayjs(now).add(30, 'day').toDate()
  return firestore.Timestamp.fromDate(date)
}
