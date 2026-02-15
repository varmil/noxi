import { z } from 'zod'

export const schema = z.object({
  userId: z.number(),
  name: z.string(),
  username: z.string(),
  image: z.string(),
  description: z.string(),
  website: z.string(),
  createdAt: z.coerce.date()
})
export const responseListSchema = z.object({
  list: z.array(schema)
})
export type UserProfileSchema = z.infer<typeof schema>
export type UserProfilesSchema = UserProfileSchema[]
