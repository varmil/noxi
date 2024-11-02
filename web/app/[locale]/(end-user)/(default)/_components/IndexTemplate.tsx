import { PropsWithChildren, PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import { Button } from '@/components/ui/button'
import HeroTable, {
  HeroTableTitle
} from 'app/[locale]/(end-user)/(default)/_components/ui/table/HeroTable'
import IconSection from 'features/icon-section/IconSection'
import { Link } from 'lib/navigation'

type Props = {}

const Container = (props: PropsWithChildren<{}>) => {
  return (
    <div className="container px-0 py-8 md:px-4 md:py-24">{props.children}</div>
  )
}

const HeroSectionContainer = (props: PropsWithChildren<{}>) => {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_700px]">
      {props.children}
    </div>
  )
}

const TableContainer = (props: PropsWithChildren<{}>) => {
  return <div className="rounded-lg p-6 border">{props.children}</div>
}

export async function IndexTemplate({}: PropsWithoutRef<Props>) {
  const t = await getTranslations('Page.index')

  return (
    <>
      <Container>
        <HeroSectionContainer>
          <div className="flex flex-col justify-center gap-y-8">
            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl xl:text-6xl/none">
              {t('title')}
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              {t('description')}
            </p>
            <Button className="w-fit" asChild>
              <Link href="#">View More Rankings</Link>
            </Button>
          </div>
          <TableContainer>
            <HeroTableTitle />
            <HeroTable />
          </TableContainer>
        </HeroSectionContainer>
      </Container>
    </>
  )
}
