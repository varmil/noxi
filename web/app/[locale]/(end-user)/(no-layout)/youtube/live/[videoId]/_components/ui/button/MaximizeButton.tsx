'use client'

import { Maximize } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { useGlobalTheaterMode } from '../../../_hooks/youtubeLiveStates'

export default function MaximizeButton() {
  const t = useTranslations('Page.youtube.live.id.button')
  const { setTheaterMode } = useGlobalTheaterMode()

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            // className="w-full"
            onClick={() => setTheaterMode(true)}
            aria-label={t('theaterMode')}
          >
            <Maximize className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>{t('theaterMode')}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
