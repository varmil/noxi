import { PropsWithChildren, PropsWithoutRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Button } from '@/components/ui/button'
import { ChannelsRankingDefaultUrl } from 'config/constants/RankingRoute'
import ChannelsRankingGallery from 'features/channels-ranking/components/gallery/ChannelsRankingGallery'
import { Link } from 'lib/navigation'
import { HeroH2 } from './styles/HeroTitles'
import SocialProofSection from './ui/social-proof/SocialProofSection'

type Props = {}

const Container = (props: PropsWithChildren<{}>) => {
  return (
    <div className="container px-0 py-8 space-y-16 md:px-4 md:py-24 lg:space-y-36">
      {props.children}
    </div>
  )
}

const HeroSectionContainer = (props: PropsWithChildren<{}>) => {
  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_480px] xl:grid-cols-[1fr_640px] 2xl:grid-cols-[1fr_700px]">
      {props.children}
    </div>
  )
}

export async function IndexTemplate({}: PropsWithoutRef<Props>) {
  const t = await getTranslations('Page.index')
  return (
    <>
      <Container>
        <HeroSectionContainer>
          <div className="flex flex-col justify-center gap-y-8 whitespace-pre-wrap">
            <HeroH2>{t('title')}</HeroH2>
            <p className="max-w-[600px] text-muted-foreground text-lg md:text-xl">
              {t('description')}
            </p>
            <Button className="hidden lg:inline-flex w-fit" asChild>
              <Link href={ChannelsRankingDefaultUrl}>
                {t('section.hero.more')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <ChannelsRankingGallery
            period="last24Hours"
            dimension="super-chat"
            group="all"
            compact
          />
        </HeroSectionContainer>

        <SocialProofSection />
      </Container>
    </>
  )
}
