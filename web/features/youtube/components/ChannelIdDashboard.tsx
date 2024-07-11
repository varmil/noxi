import { PropsWithChildren, PropsWithoutRef } from 'react'
import { getChannel } from 'features/youtube/api/getChannel'
import { ChannelProfileHeader } from 'features/youtube/components/channel/ChannelProfileHeader'
import StatsLoyaltyProgressCard from 'features/youtube/components/stats/progress-card/StatsLoyaltyProgressCard'
import StatsPopularityProgressCard from 'features/youtube/components/stats/progress-card/StatsPopularityProgressCard'
import StatsBirthdayCard from 'features/youtube/components/stats/simple-card/StatsBirthdayCard'
import StatsCumulativeVideoCard from 'features/youtube/components/stats/simple-card/StatsCumulativeUploadCard'
import StatsCumulativeViewCard from 'features/youtube/components/stats/simple-card/StatsCumulativeViewCard'
import StatsSubscriberCard from 'features/youtube/components/stats/simple-card/StatsSubscriberCard'
import { VideoCards } from 'features/youtube/components/video/VideoCards'
import { ChannelSchema } from 'features/youtube/types/channelSchema'

type Props = {
  id: string
}

export async function ChannelIdDashboard({ id }: PropsWithoutRef<Props>) {
  const { basicInfo, statistics, brandingSettings } = await getChannel(id)

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <ChannelProfileHeader
          src={basicInfo.thumbnails['medium'].url}
          name={basicInfo.title}
          description={basicInfo.description}
          subscriberCount={statistics.subscriberCount}
        />
        <div>
          <Section className="pb-8" title="YouTube Data">
            <StatsSubscriberCard count={statistics?.subscriberCount ?? 0} />
            <StatsCumulativeViewCard count={statistics?.viewCount ?? 0} />
            <StatsCumulativeVideoCard count={statistics?.videoCount ?? 0} />
            <StatsBirthdayCard
              date={new Date(basicInfo?.publishedAt).toDateString() ?? 'N/A'}
            />
          </Section>
          <Section className="pb-8" title="AI Analysis">
            <StatsPopularityProgressCard {...statistics} />
            <StatsLoyaltyProgressCard {...statistics} />
          </Section>
          <Section className="pb-8" title="Contents">
            <VideoCards channelId={basicInfo.id} />
          </Section>
        </div>
      </main>
    </div>
  )
}

function Section({
  className,
  title,
  children
}: PropsWithChildren<ChannelSchema & { className: string; title: string }>) {
  return (
    <section className={className}>
      <h2 className="text-2xl font-bold lg:text-3xl pb-4">{title}</h2>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {children}
      </div>
    </section>
  )
}
