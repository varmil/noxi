import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Page } from 'components/page'
import Image from 'components/styles/Image'
import { getSnapshotSupersRanking } from 'features/channels-ranking/utils/getSnapshotSupersRanking'
import { Link } from 'lib/navigation'
import { getWebUrl } from 'utils/web-url'

const WEEK = '2026-W04'
const WEEK_DISPLAY = '第4週'
const DATE_RANGE = '1/19〜1/25'
const YEAR = 2026

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata(): Promise<Metadata> {
  const title = `VTuberスパチャランキング 週間TOP10【${YEAR}年 ${WEEK_DISPLAY}】`
  const description = `${YEAR}年${WEEK_DISPLAY}（${DATE_RANGE}）のVTuberスーパーチャットランキングTOP10を発表。今週最もスパチャを集めたVTuberは誰？`

  const ogImageUrl = `${getWebUrl()}/api/og/weekly-ranking?week=${WEEK}&group=all`

  return {
    title,
    description,
    openGraph: {
      siteName: 'VCharts',
      title,
      description,
      type: 'article',
      publishedTime: '2026-01-26T09:00:00+09:00',
      authors: ['VCharts運営'],
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl]
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large'
    }
  }
}

export default async function WeeklySuperchatRankingW04(props: Props) {
  const params = await props.params
  const { locale } = params

  setRequestLocale(locale as 'ja' | 'en')

  const ranking = await getSnapshotSupersRanking({
    period: 'weekly',
    target: WEEK,
    group: 'all',
    limit: 10
  })

  return (
    <Page className="max-w-3xl mx-auto mt-6">
      <article className="space-y-12">
        {/* ヘッダー */}
        <header className="space-y-6">
          <h1 className="text-2xl sm:text-3xl font-bold leading-tight">
            【週間】VTuberスパチャランキング TOP10
          </h1>
          <p className="text-muted-foreground">
            {YEAR}年{WEEK_DISPLAY}（{DATE_RANGE}）
            のVTuberスーパーチャットランキングを発表します。
            今週最もスパチャを集めたVTuberをTOP10形式でお届けします。
          </p>
        </header>

        {/* 今週のハイライト */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold">今週のハイライト</h2>
          <div className="rounded-lg border bg-muted/50 p-5 space-y-3">
            <p>
              <span className="font-semibold">甲斐田 晴</span>
              （にじさんじ）が2週連続で1位を獲得。1st One-Man
              Live「足跡」の重大告知配信が、
              今週最も多くのスーパーチャットを集めた。
            </p>
          </div>
          <div className="rounded-lg border bg-muted/50 p-5 space-y-3">
            <p>
              TOP10の所属事務所内訳は、
              <span className="font-semibold">にじさんじ 6名</span>、
              <span className="font-semibold">ホロライブ 2名</span>、
              <span className="font-semibold">個人勢 2名</span>
              という結果、にじさんじ強し。
            </p>
          </div>
        </section>

        {/* ランキング */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold">ランキング TOP10</h2>
          <div className="space-y-3">
            {ranking.map(item => (
              <Link
                key={item.channelId}
                href={`/${item.group}/channels/${item.channelId}`}
                className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-accent transition-colors"
              >
                <div className="flex items-baseline gap-1 min-w-[2.8rem]">
                  <span className="text-2xl font-bold tracking-tighter">
                    {item.rank}
                  </span>
                  <span className="text-sm text-muted-foreground">位</span>
                </div>
                <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={item.channelThumbnails ?? ''}
                    alt={item.channelTitle}
                    width={56}
                    height={56}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{item.channelTitle}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.amount.toLocaleString()} 円
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* フッター */}
        <footer className="pt-8 border-t space-y-4">
          <p className="text-sm text-muted-foreground">
            金額はスーパーチャットおよびスーパーステッカーの合計で待機所の金額は含まれません。
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/ranking/super-chat/channels/all/weekly-2026-W04"
              className="hover:underline"
            >
              詳細なランキングを見る →
            </Link>
          </div>
        </footer>
      </article>
    </Page>
  )
}
