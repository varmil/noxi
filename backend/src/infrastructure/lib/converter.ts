import admin from 'firebase-admin'
import { z } from 'zod'

export const converter = <T extends z.AnyZodObject>(
  schema: T
): admin.firestore.FirestoreDataConverter<z.infer<T>> => ({
  toFirestore: (data: z.infer<T>): admin.firestore.DocumentData => {
    return schema.partial().strict().parse(data)
  },
  fromFirestore: (
    snapshot: admin.firestore.QueryDocumentSnapshot<z.infer<T>>
  ): z.infer<T> => {
    return schema.strict().parse(snapshot.data())
  }
})
