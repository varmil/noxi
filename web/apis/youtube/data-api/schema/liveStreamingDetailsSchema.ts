import { z } from 'zod'

const liveStreamingDetailsSchema = z.object({
  scheduledStartTime: z.string().datetime(),
  actualStartTime: z.string().datetime().optional(),
  actualEndTime: z.string().datetime().optional(),
  concurrentViewers: z.coerce.number().optional()
})

const response = z.object({
  id: z.string(),
  liveStreamingDetails: liveStreamingDetailsSchema.optional()
})

export const responseSchema = z.array(response)
export type LiveStreamingDetailsSchema = z.infer<
  typeof liveStreamingDetailsSchema
>
export type LiveStreamingDetailsListSchema = z.infer<typeof response>[]
