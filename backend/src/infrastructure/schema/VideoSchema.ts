import { z } from 'zod'
import { converter } from '@infra/lib/converter'
import {
  firestoreFieldValueOrTimestampSchema,
  firestoreTimestampSchema
} from '@infra/schema/TimeStampSchema'

export const videoSchema = z.object({
  id: z.string(),

  snippet: z.object({
    publishedAt: firestoreTimestampSchema,
    channelId: z.string(),
    title: z.string(),
    description: z.string(),
    thumbnails: z.record(
      z.enum(['default', 'medium', 'high', 'standard', 'maxres']),
      z.object({
        url: z.string().optional().nullable(),
        width: z.number().optional().nullable(),
        height: z.number().optional().nullable()
      })
    ),
    tags: z.array(z.string()),
    categoryId: z.string()
  }),
  duration: z.string().duration(),
  statistics: z.object({
    viewCount: z.number().min(0),
    likeCount: z.number().min(0),
    commentCount: z.number().min(0)
  }),
  liveStreamingDetails: z
    .object({
      actualStartTime: firestoreTimestampSchema,
      actualEndTime: firestoreTimestampSchema
    })
    .optional(),

  updatedAt: firestoreFieldValueOrTimestampSchema,
  expireAt: firestoreTimestampSchema
})

export type VideoSchema = z.infer<typeof videoSchema>
export const videoConverter = converter(videoSchema)
