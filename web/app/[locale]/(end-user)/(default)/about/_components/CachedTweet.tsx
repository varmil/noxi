import { unstable_cache } from 'next/cache'
import { EmbeddedTweet, TweetNotFound } from 'react-tweet'
import { getTweet as _getTweet } from 'react-tweet/api'

const getTweet = unstable_cache(
  async (id: string) => _getTweet(id),
  ['tweet'],
  { revalidate: 3600 * 24 }
)

export default async function CachedTweet({ id }: { id: string }) {
  let tweet: Awaited<ReturnType<typeof getTweet>>
  try {
    tweet = await getTweet(id)
  } catch (error) {
    console.error(error)
    return <TweetNotFound error={error} />
  }

  return tweet ? <EmbeddedTweet tweet={tweet} /> : <TweetNotFound />
}
