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
        url: z.string(),
        width: z.number().optional(),
        height: z.number().optional()
      })
    ),
    tags: z.array(z.string()),
    categoryId: z.string()
  }),
  duration: z.string().duration(),
  statistics: z.object({
    viewCount: z.string(),
    likeCount: z.string(),
    commentCount: z.string()
  }),
  liveStreamingDetails: z
    .object({
      actualStartTime: firestoreTimestampSchema,
      actualEndTime: firestoreTimestampSchema
    })
    .optional(),

  updatedAt: firestoreFieldValueOrTimestampSchema
})

export type VideoSchema = z.infer<typeof videoSchema>
export const videoConverter = converter(videoSchema)
