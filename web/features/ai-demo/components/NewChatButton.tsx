'use client'

import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { useResetChat } from '../hooks/useResetChat'

export default function NewChatButton() {
  const t = useTranslations('Features.aiDemo')
  const { reset } = useResetChat()

  return (
    <Button variant="outline" size="sm" onClick={reset} title={t('newChat')}>
      <Plus className="size-5" />
      {t('newChat')}
    </Button>
  )
}
