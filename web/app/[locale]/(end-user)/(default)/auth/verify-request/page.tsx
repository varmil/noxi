import { Check } from 'lucide-react'
import { useTranslations } from 'next-intl'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Page } from 'components/page'

export default function VerifyRequest() {
  const page = useTranslations('Page.auth.verifyRequest')
  return (
    <Page className="flex flex-col items-center justify-center min-h-[70vh] mt-12 sm:mt-20">
      <Card className="">
        <CardHeader className="flex items-center gap-4">
          <Check className="size-6 stroke-green-600" />
          <section>
            <CardTitle className="text-xl font-bold mb-1">
              {page('title')}
            </CardTitle>
            <CardDescription className="ml-0.5">
              {page('description')}
            </CardDescription>
          </section>
        </CardHeader>
        <CardContent>
          <p className="max-w-md">{page('content')}</p>
        </CardContent>
      </Card>
    </Page>
  )
}
