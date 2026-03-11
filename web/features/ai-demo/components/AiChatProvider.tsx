'use client'

import { PropsWithChildren, useCallback, useMemo, useState } from 'react'
import { ResetChatContext } from '../hooks/useResetChat'

export default function AiChatProvider({ children }: PropsWithChildren) {
  const [resetKey, setResetKey] = useState(0)

  const reset = useCallback(() => {
    setResetKey(prev => prev + 1)
  }, [])

  const value = useMemo(() => ({ resetKey, reset }), [resetKey, reset])

  return (
    <ResetChatContext.Provider value={value}>
      {children}
    </ResetChatContext.Provider>
  )
}
