'use client'

import { useEffect, useRef } from 'react'
import { Sparkles } from 'lucide-react'
import { useStreamingText } from '../hooks/useStreamingText'
import ComparisonAnswer from './answers/ComparisonAnswer'
import SubscriberAnswer from './answers/SubscriberAnswer'
import TrendAnswer from './answers/TrendAnswer'
import type { DemoQuestion } from '../constants/demoData'

type Props = {
  answerText: string
  question: DemoQuestion
  onComplete: () => void
}

export default function StreamingMessage({
  answerText,
  question,
  onComplete
}: Props) {
  const { displayedText, isComplete } = useStreamingText(answerText)
  const completedRef = useRef(false)

  useEffect(() => {
    if (isComplete && !completedRef.current) {
      completedRef.current = true
      onComplete()
    }
  }, [isComplete, onComplete])

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-4 items-center">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <Sparkles className="size-4 text-primary" />
        </div>
        <span className="text-muted-foreground">
          5,781レコードを探索しました (0.12秒)
        </span>
      </div>
      <div className="flex-1 space-y-2 pt-1">
        <p className="whitespace-pre-wrap text-base leading-relaxed">
          {displayedText}
          {!isComplete && (
            <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-foreground" />
          )}
        </p>
        {isComplete && <AnswerContent type={question.type} />}
      </div>
    </div>
  )
}

function AnswerContent({ type }: { type: DemoQuestion['type'] }) {
  switch (type) {
    case 'trend':
      return <TrendAnswer />
    case 'subscriber':
      return <SubscriberAnswer />
    case 'comparison':
      return <ComparisonAnswer />
  }
}
