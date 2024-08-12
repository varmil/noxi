import { z } from 'zod'

const AuthorSchema = z.object({
  name: z.string(),
  uri: z.string()
})

const EntrySchema = z.object({
  id: z.string(),
  'yt:videoId': z.string(),
  'yt:channelId': z.string(),
  title: z.string(),
  link: z.object({
    rel: z.string(),
    href: z.string()
  }),
  author: AuthorSchema,
  published: z.string().refine(date => !isNaN(Date.parse(date)), {
    message: 'Invalid date format'
  }),
  updated: z.string().refine(date => !isNaN(Date.parse(date)), {
    message: 'Invalid date format'
  })
})

const FeedSchema = z.object({
  link: z.array(
    z.object({
      rel: z.string(),
      href: z.string()
    })
  ),
  title: z.string(),
  updated: z.string().refine(date => !isNaN(Date.parse(date)), {
    message: 'Invalid date format'
  }),
  entry: EntrySchema
})

export const updatedEntryXMLSchema = z.object({
  feed: FeedSchema
})

export type UpdatedEntryXMLSchema = z.infer<typeof updatedEntryXMLSchema>
