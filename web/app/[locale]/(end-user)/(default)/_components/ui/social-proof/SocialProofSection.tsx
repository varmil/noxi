import { PropsWithChildren } from 'react'
import { useTranslations } from 'next-intl'
import Underline from 'components/styles/string/Underline'
import {
  ChannelsRankingDefaultUrl,
  StreamRankingDefaultUrl
} from 'config/constants/RankingRoute'
import { Link } from 'lib/navigation'
import { HeroH3 } from '../../styles/HeroTitles'

export default function SocialProofSection() {
  const t = useTranslations('Page.index.section.socialProof')

  return (
    <section>
      <div className="flex flex-col items-center space-y-8 text-center">
        <HeroH3>{t('title')}</HeroH3>
        <p className="max-w-[800px] text-muted-foreground text-lg md:text-xl">
          {t('description')}
        </p>

        <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
          <Item href={ChannelsRankingDefaultUrl}>
            <NumberText>650+</NumberText>
            <Text>{t('channels')}</Text>
          </Item>
          <Item href={StreamRankingDefaultUrl}>
            <NumberText>80K+</NumberText>
            <Text>{t('liveStreams')}</Text>
          </Item>
          <Item href="/groups">
            <NumberText>25+</NumberText>
            <Text>{t('groups')}</Text>
          </Item>
        </div>
      </div>
    </section>
  )
}

const NumberText = ({ children }: PropsWithChildren<{}>) => (
  <span className="text-4xl font-bold md:text-5xl lg:text-6xl">{children}</span>
)

type ItemProps = PropsWithChildren<{ href?: string }>

const Item = ({ children, href }: ItemProps) =>
  href ? (
    <div className="group">
      <Link
        href={href}
        className="flex flex-col items-center space-y-2 transition-transform duration-75 group-hover:scale-110"
      >
        {children}
      </Link>
    </div>
  ) : (
    <div className="flex flex-col items-center space-y-2">{children}</div>
  )

const Text = ({ children }: PropsWithChildren<{}>) => (
  <Underline className="text-base md:text-lg text-muted-foreground group-hover:scale-110">
    {children}
  </Underline>
)
