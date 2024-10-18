'use client'

import { Maximize } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { useGlobalTheaterMode } from '../../../_hooks/youtubeLiveStates'

export default function MaximizeButton() {
  const t = useTranslations('Page.youtube.live.button')
  const { setTheaterMode } = useGlobalTheaterMode()

  return (
    <Button
      variant="ghost"
      className="w-full"
      onClick={() => setTheaterMode(true)}
    >
      <Maximize className="mr-2 h-4 w-4" />
      {t('theaterMode')}
    </Button>
  )
}
