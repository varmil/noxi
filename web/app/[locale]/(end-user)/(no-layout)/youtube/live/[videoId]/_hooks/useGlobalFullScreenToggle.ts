'use client'

import { createGlobalState } from 'react-use'

const useGlobalValue = createGlobalState<boolean>(false)

export default function useGlobalFullScreenToggle() {
  const [isFullScreen, setFullScreen] = useGlobalValue()
  return { isFullScreen, setFullScreen }
}
