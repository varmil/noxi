'use client'

import { createGlobalState } from 'react-use'

const useGlobalValue = createGlobalState<boolean>(false)

export default function useGlobalTheaterMode() {
  const [isTheaterMode, setTheaterMode] = useGlobalValue()
  return { isTheaterMode, setTheaterMode }
}
