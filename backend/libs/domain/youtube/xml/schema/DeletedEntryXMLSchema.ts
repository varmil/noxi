import { z } from 'zod'

const AuthorSchema = z.object({
  name: z.string(),
  uri: z.string().url()
})

const DeletedEntrySchema = z.object({
  ref: z.string(),
  when: z.string().refine(date => !isNaN(Date.parse(date)), {
    message: 'Invalid date format'
  }),
  link: z.object({
    href: z.string().url()
  }),
  'at:by': AuthorSchema
})

const FeedSchema = z.object({
  'at:deleted-entry': DeletedEntrySchema
})

export const deletedEntryXMLSchema = z.object({
  feed: FeedSchema
})

export type DeletedEntryXMLSchema = z.infer<typeof deletedEntryXMLSchema>
