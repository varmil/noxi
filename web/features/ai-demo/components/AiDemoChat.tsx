'use client'

import { useCallback, useState } from 'react'
import { Sparkles } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useResetChat } from '../hooks/useResetChat'
import StreamingMessage from './StreamingMessage'
import SubscriptionCard from './SubscriptionCard'
import TemplateQuestions from './TemplateQuestions'
import type { DemoQuestion } from '../constants/demoData'

type Phase = 'idle' | 'streaming' | 'complete'

export default function AiDemoChat() {
  const { resetKey } = useResetChat()
  return <AiDemoChatInner key={resetKey} />
}

function AiDemoChatInner() {
  const t = useTranslations('Features.aiDemo')
  const [selectedQuestion, setSelectedQuestion] = useState<DemoQuestion | null>(
    null
  )
  const [phase, setPhase] = useState<Phase>('idle')
  const handleSelect = useCallback((question: DemoQuestion) => {
    setSelectedQuestion(question)
    setPhase('streaming')
  }, [])

  const handleStreamComplete = useCallback(() => {
    setPhase(prev => (prev === 'streaming' ? 'complete' : prev))
  }, [])

  return (
    <div className="mx-auto flex h-full max-w-2xl flex-col">
      {phase === 'idle' ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-8 px-4">
          <div className="flex flex-col items-center gap-3">
            <Sparkles className="size-10 fill-rose-600 text-rose-600 animate-in spin-in-90 duration-1000" />
            <h1 className="text-2xl font-semibold">{t('title')}</h1>
            <p className="text-center text-sm text-muted-foreground">
              {t('subtitle')}
            </p>
          </div>
          <TemplateQuestions onSelect={handleSelect} />
        </div>
      ) : (
        <div className="flex-1 space-y-6 overflow-y-auto px-4 py-6">
          {/* User question */}
          {selectedQuestion && (
            <div className="flex justify-end">
              <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground">
                {t(selectedQuestion.questionKey)}
              </div>
            </div>
          )}

          {/* AI answer */}
          {selectedQuestion && (
            <StreamingMessage
              answerText={t(selectedQuestion.answerKey)}
              question={selectedQuestion}
              onComplete={handleStreamComplete}
            />
          )}

          {/* Subscription card */}
          {phase === 'complete' && selectedQuestion && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <SubscriptionCard featureId={selectedQuestion.featureId} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
