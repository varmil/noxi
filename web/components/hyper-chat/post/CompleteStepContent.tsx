'use client'

import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { AnimatedCheckmark } from './AnimatedCheckmark'

type Props = {
  onClose: () => void
}

export function CompleteStepContent({ onClose }: Props) {
  const t = useTranslations('Features.hyperChat')

  return (
    <>
      <div className="flex flex-col items-center py-8">
        <div className="mx-auto size-20 flex items-center justify-center rounded-full mb-8">
          <AnimatedCheckmark className="size-20" />
        </div>
        <p className="text-lg font-bold">THANK YOU !!</p>
        <p className="text-center text-muted-foreground">
          {t('dialog.complete.description')}
        </p>
      </div>
      <div className="flex justify-end">
        <Button onClick={onClose}>{t('dialog.close')}</Button>
      </div>
    </>
  )
}
