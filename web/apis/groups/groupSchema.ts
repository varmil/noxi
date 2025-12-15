import { z } from 'zod'

export const groupSchema = z.object({
  id: z.string(),
  name: z.string(),
  iconSrc: z.string()
})

export const groupsResponseSchema = z.array(groupSchema)

export const groupRegistrationSchema = z.object({
  id: z.number(),
  groupId: z.string(),
  name: z.string(),
  iconSrc: z.string(),
  status: z.enum(['pending', 'approved', 'rejected']),
  appliedAt: z.coerce.date()
})

export const groupRegistrationsResponseSchema = z.array(groupRegistrationSchema)

export type GroupSchema = z.infer<typeof groupSchema>
export type GroupsSchema = z.infer<typeof groupsResponseSchema>
export type GroupRegistrationSchema = z.infer<typeof groupRegistrationSchema>
export type GroupRegistrationsSchema = z.infer<
  typeof groupRegistrationsResponseSchema
>
