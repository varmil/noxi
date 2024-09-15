'use client'

import { createGlobalState } from 'react-use'

const useTheaterMode = createGlobalState<boolean>(false)
const useRotate180 = createGlobalState<boolean>(false)

export function useGlobalTheaterMode() {
  const [isTheaterMode, setTheaterMode] = useTheaterMode()
  return { isTheaterMode, setTheaterMode }
}

export function useGlobalRotate180() {
  const [isRotate180, setRotate180] = useRotate180()
  return { isRotate180, setRotate180 }
}
