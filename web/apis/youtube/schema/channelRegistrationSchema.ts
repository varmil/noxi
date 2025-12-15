import { z } from 'zod'

export const schema = z.object({
  channelId: z.string(),
  title: z.string(),
  country: z.string(),
  defaultLanguage: z.string(),
  gender: z.enum(['male', 'female', 'nonbinary']),
  group: z.string(),
  subscriberCount: z.number().min(0),
  liveStreamCount: z.number().min(0),
  status: z.enum(['pending', 'approved', 'rejected', 'done']),
  appliedAt: z.string().datetime()
})
export const listSchema = z.object({ list: z.array(schema) })

export type ChannelRegistrationSchema = z.infer<typeof schema>
export type ChannelRegistrationsSchema = ChannelRegistrationSchema[]
