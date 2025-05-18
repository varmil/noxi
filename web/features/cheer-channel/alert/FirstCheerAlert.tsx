import { Lightbulb } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'

export default function FirstCheerAlert({
  channelTitle
}: {
  channelTitle: string
}) {
  const feat = useTranslations('Features.cheerChannel.alert.firstCheer')
  return (
    <Alert>
      <Lightbulb className="size-5" />
      <AlertTitle>{feat('title')}</AlertTitle>
      <AlertDescription>
        {feat('description', { channel: channelTitle })}
      </AlertDescription>
    </Alert>
  )
}
