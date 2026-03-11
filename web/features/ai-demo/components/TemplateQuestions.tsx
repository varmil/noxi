'use client'

import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { DEMO_QUESTIONS, type DemoQuestion } from '../constants/demoData'

type Props = {
  onSelect: (question: DemoQuestion) => void
}

export default function TemplateQuestions({ onSelect }: Props) {
  const t = useTranslations('Features.aiDemo')

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {DEMO_QUESTIONS.map(q => (
        <Button
          key={q.id}
          variant="outline"
          className="h-auto whitespace-normal rounded-full px-4 py-2 text-sm"
          onClick={() => onSelect(q)}
        >
          {t(q.questionKey)}
        </Button>
      ))}
    </div>
  )
}
