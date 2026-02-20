import { z } from 'zod'

export const posterSchema = z.object({
  userId: z.number(),
  totalAmount: z.number(),
  name: z.string(),
  image: z.string(),
  username: z.string()
})

export const responseSchema = z.object({
  list: z.array(posterSchema)
})

export type PosterSchema = z.infer<typeof posterSchema>

export const anonymousPosterSchema = z.object({
  totalAmount: z.number()
})

export type AnonymousPosterSchema = z.infer<typeof anonymousPosterSchema>
