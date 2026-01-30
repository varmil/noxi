import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Page } from 'components/page'
import { getAlternates } from 'utils/metadata/getAlternates'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params
  const [global, page] = await Promise.all([
    getTranslations({ locale: locale as 'ja' | 'en', namespace: 'Global' }),
    getTranslations({
      locale: locale as 'ja' | 'en',
      namespace: 'Page.help.emailAlias'
    })
  ])

  return {
    title: `${page('metadata.title')} - ${global('title')}`,
    description: page('metadata.description'),
    alternates: getAlternates({ pathname: '/help/email-alias', locale })
  }
}

export default async function EmailAliasPage(props: Props) {
  const { locale } = await props.params
  const t = await getTranslations({
    locale: locale as 'ja' | 'en',
    namespace: 'Page.help.emailAlias'
  })

  return (
    <Page className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">{t('title')}</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('gmail.title')}</CardTitle>
            <CardDescription>{t('gmail.description')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <section>
              <h3 className="font-semibold mb-2">{t('gmail.dotTitle')}</h3>
              <p className="text-sm text-muted-foreground mb-2">
                {t('gmail.dotDescription')}
              </p>
              <div className="bg-muted p-3 rounded-md text-sm font-mono">
                <p>example@gmail.com</p>
                <p>e.x.a.m.p.l.e@gmail.com</p>
                <p>exam.ple@gmail.com</p>
                <p className="text-muted-foreground mt-1">
                  ↑ {t('gmail.dotExample')}
                </p>
              </div>
            </section>

            <section>
              <h3 className="font-semibold mb-2">{t('gmail.plusTitle')}</h3>
              <p className="text-sm text-muted-foreground mb-2">
                {t('gmail.plusDescription')}
              </p>
              <div className="bg-muted p-3 rounded-md text-sm font-mono">
                <p>example@gmail.com</p>
                <p>example+shopping@gmail.com</p>
                <p>example+news@gmail.com</p>
                <p className="text-muted-foreground mt-1">
                  ↑ {t('gmail.plusExample')}
                </p>
              </div>
            </section>

            <section>
              <h3 className="font-semibold mb-2">{t('gmail.googlemailTitle')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('gmail.googlemailDescription')}
              </p>
              <div className="bg-muted p-3 rounded-md text-sm font-mono mt-2">
                <p>example@gmail.com</p>
                <p>example@googlemail.com</p>
                <p className="text-muted-foreground mt-1">
                  ↑ {t('gmail.googlemailExample')}
                </p>
              </div>
            </section>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('ourPolicy.title')}</CardTitle>
            <CardDescription>{t('ourPolicy.description')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">{t('ourPolicy.content')}</p>
            <div className="bg-muted p-3 rounded-md text-sm">
              <p className="font-semibold mb-2">{t('ourPolicy.exampleTitle')}</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>example+test@gmail.com → example@gmail.com</li>
                <li>e.x.a.m.p.l.e@gmail.com → example@gmail.com</li>
                <li>Example@Gmail.com → example@gmail.com</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('otherProviders.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {t('otherProviders.description')}
            </p>
          </CardContent>
        </Card>

        <div className="text-sm text-muted-foreground">
          <p>{t('reference')}</p>
          <a
            href="https://support.google.com/mail/community-guide/257098940"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            {t('referenceLink')}
          </a>
        </div>
      </div>
    </Page>
  )
}
