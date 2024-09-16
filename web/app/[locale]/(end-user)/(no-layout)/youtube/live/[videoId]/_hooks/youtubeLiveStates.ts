'use client'

import { createGlobalState } from 'react-use'

const useOpenLiveChat = createGlobalState<boolean>(false)
const useTheaterMode = createGlobalState<boolean>(false)
const useRotate180 = createGlobalState<boolean>(false)

/** デフォルトモード > チャット が開いているかどうか */
export function useGlobalOpenLiveChat() {
  const [isOpenLiveChat, setOpenLiveChat] = useOpenLiveChat()
  return { isOpenLiveChat, setOpenLiveChat }
}

/** シアターモードかどうか */
export function useGlobalTheaterMode() {
  const [isTheaterMode, setTheaterMode] = useTheaterMode()
  return { isTheaterMode, setTheaterMode }
}

/** シアターモード > Rotate180 かどうか */
export function useGlobalRotate180() {
  const [isRotate180, setRotate180] = useRotate180()
  return { isRotate180, setRotate180 }
}
