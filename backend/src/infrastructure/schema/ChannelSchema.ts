import { z } from 'zod'
import { converter } from '@infra/lib/converter'
import {
  firestoreFieldValueOrTimestampSchema,
  firestoreTimestampSchema
} from '@infra/schema/TimeStampSchema'

// スキーマを定義
export const channelSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  thumbnails: z.record(
    z.enum(['default', 'medium', 'high', 'standard', 'maxres']),
    z.object({
      url: z.string(),
      width: z.number().optional(),
      height: z.number().optional()
    })
  ),
  publishedAt: firestoreTimestampSchema,
  updatedAt: firestoreFieldValueOrTimestampSchema
})

// スキーマをもとに型を作成
export type ChannelSchema = z.infer<typeof channelSchema>

// スキーマをもとにコンバーターを作成
export const channelConverter = converter(channelSchema)
