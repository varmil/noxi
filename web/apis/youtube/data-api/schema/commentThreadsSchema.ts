import { z } from 'zod'

const comments = z.object({
  id: z.string(),
  snippet: z.object({
    authorDisplayName: z.string(),
    authorProfileImageUrl: z.string().url(),
    authorChannelUrl: z.string().url(),
    authorChannelId: z.object({
      value: z.string()
    }),
    textDisplay: z.string(),
    textOriginal: z.string(),
    parentId: z.string().optional(),
    canRate: z.boolean(),
    viewerRating: z.enum(['none', 'like', 'dislike']),
    likeCount: z.number().optional(),
    publishedAt: z.string().datetime(),
    updatedAt: z.string().datetime()
  })
})

const schema = z.object({
  id: z.string(),

  snippet: z.object({
    channelId: z.string(),
    videoId: z.string(),
    topLevelComment: comments,
    canReply: z.boolean(),
    totalReplyCount: z.number(),
    isPublic: z.boolean()
  }),

  replies: z
    .object({
      comments: z.array(comments)
    })
    .optional()
})

export const responseSchema = z.array(schema)
export type CommentThreadsSchema = z.infer<typeof schema>
export type CommentThreadsListSchema = CommentThreadsSchema[]
