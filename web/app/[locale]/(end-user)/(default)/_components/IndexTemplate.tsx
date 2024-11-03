import { PropsWithChildren, PropsWithoutRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Button } from '@/components/ui/button'
// import IconSection from 'features/icon-section/IconSection'
import { Card, CardContent } from '@/components/ui/card'
import { Link } from 'lib/navigation'
import { HeroH1 } from './styles/HeroTitles'
import SocialProofSection from './ui/social-proof/SocialProofSection'
import HeroTable, { HeroTableTitle } from './ui/table/HeroTable'

type Props = {}

const Container = (props: PropsWithChildren<{}>) => {
  return (
    <div className="container px-2 py-8 space-y-16 md:px-4 md:py-24 md:space-y-36">
      {props.children}
    </div>
  )
}

const HeroSectionContainer = (props: PropsWithChildren<{}>) => {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_700px]">
      {props.children}
    </div>
  )
}

const TableContainer = (props: PropsWithChildren<{}>) => {
  return <div className="rounded-lg p-4 lg:p-6 border">{props.children}</div>
}

export async function IndexTemplate({}: PropsWithoutRef<Props>) {
  const t = await getTranslations('Page.index')
  return (
    <>
      <Container>
        <HeroSectionContainer>
          <div className="flex flex-col justify-center gap-y-8">
            <HeroH1>{t('title')}</HeroH1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              {t('description')}
            </p>
            <Button className="w-fit" asChild>
              <Link href="#">
                Most Watched right now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <Card>
            <HeroTableTitle className="px-4 sm:px-6" />
            <CardContent className="px-4 sm:px-6">
              <HeroTable />
            </CardContent>
          </Card>
        </HeroSectionContainer>

        <SocialProofSection />
      </Container>
    </>
  )
}
