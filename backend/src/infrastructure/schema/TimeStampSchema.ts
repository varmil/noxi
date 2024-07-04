import admin from 'firebase-admin'
import { z } from 'zod'

const firestoreFieldValueSchema = z.custom<admin.firestore.FieldValue>(
  value => value instanceof admin.firestore.FieldValue
)

export const firestoreTimestampSchema = z.custom<admin.firestore.Timestamp>(
  value => value instanceof admin.firestore.Timestamp
)

export const firestoreFieldValueOrTimestampSchema = z.union([
  firestoreFieldValueSchema,
  firestoreTimestampSchema
])
