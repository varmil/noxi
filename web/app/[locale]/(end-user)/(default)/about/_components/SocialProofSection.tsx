import { Suspense } from 'react'
import { getTranslations } from 'next-intl/server'
import { TweetSkeleton } from 'react-tweet'
import CachedTweet from './CachedTweet'
import TweetThemeWrapper from './TweetThemeWrapper'

const TWEET_IDS = [
  '2003835556455752066',
  '2029844731556208722',
  '2028381290555494814',
  '2007065060544585929',
  '2026603213915595209',
  '2024480783231308063'
]

export default async function SocialProofSection() {
  const t = await getTranslations('Pages.about.social')

  return (
    <section className="py-20">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-12">
          <h2 className="mb-1 text-center text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {t('title')}
          </h2>
          <p className="text-center text-pretty text-base leading-relaxed text-muted-foreground">
            {t('subtitle')}
          </p>
        </div>

        <TweetThemeWrapper>
          {TWEET_IDS.map(id => (
            <div key={id} className="[&>div]:!my-0">
              <Suspense fallback={<TweetSkeleton />}>
                <CachedTweet id={id} />
              </Suspense>
            </div>
          ))}
        </TweetThemeWrapper>
      </div>
    </section>
  )
}
