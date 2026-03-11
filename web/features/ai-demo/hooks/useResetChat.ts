'use client'

import { createContext, useContext } from 'react'

type ResetChatContextType = {
  resetKey: number
  reset: () => void
}

export const ResetChatContext = createContext<ResetChatContextType>({
  resetKey: 0,
  reset: () => {}
})

export function useResetChat() {
  return useContext(ResetChatContext)
}
