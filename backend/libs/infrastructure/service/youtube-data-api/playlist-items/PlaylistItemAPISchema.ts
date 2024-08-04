import { z } from 'zod'

export const playlistItemAPISchema = z.object({
  contentDetails: z.object({
    /**
     * The ID that YouTube uses to uniquely identify a video. To retrieve the video resource, set the id query parameter to this value in your API request.
     */
    videoId: z.string(),
    /**
     * The date and time that the video was published to YouTube.
     */
    videoPublishedAt: z.string().datetime()
  })
})
