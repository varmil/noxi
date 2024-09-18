import { z } from 'zod'

const schema = z.object({
  id: z.string(),
  liveStreamingDetails: z
    .object({
      scheduledStartTime: z.string().datetime(),
      actualStartTime: z.string().datetime().optional(),
      actualEndTime: z.string().datetime().optional(),
      concurrentViewers: z.string().optional()
    })
    .optional()
})

export const responseSchema = z.array(schema)
export type LiveStreamingDetailsSchema = z.infer<typeof schema>
export type LiveStreamingDetailsListSchema = LiveStreamingDetailsSchema[]
