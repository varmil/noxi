import { PropsWithChildren } from 'react'
import { useTranslations } from 'next-intl'
import { HeroH3 } from '../../styles/HeroTitles'

export default function SocialProofSection() {
  const t = useTranslations('Page.index.section.socialProof')

  return (
    <section>
      <div className="flex flex-col items-center space-y-8 text-center">
        <HeroH3>{t('title')}</HeroH3>
        <p className="max-w-[800px] text-lg text-muted-foreground md:text-xl">
          {t('description')}
        </p>

        <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
          <Item>
            <NumberText>150+</NumberText>
            <span className="text-lg text-muted-foreground">
              {t('channels')}
            </span>
          </Item>
          <Item>
            <NumberText>4K+</NumberText>
            <span className="text-lg text-muted-foreground">
              {t('liveStreams')}
            </span>
          </Item>
          <Item>
            <NumberText>6+</NumberText>
            <span className="text-lg text-muted-foreground">
              {t('countries')}
            </span>
          </Item>
        </div>
      </div>
    </section>
  )
}

const NumberText = ({ children }: PropsWithChildren<{}>) => (
  <span className="text-4xl font-bold md:text-5xl lg:text-6xl">{children}</span>
)

const Item = ({ children }: PropsWithChildren<{}>) => (
  <div className="flex flex-col items-center space-y-2">{children}</div>
)
