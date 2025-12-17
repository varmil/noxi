'use client'

import { createGlobalState } from 'react-use'

const useOpenLiveChat = createGlobalState<boolean>(false)

/** デフォルトモード > チャット が開いているかどうか */
export function useGlobalOpenLiveChat() {
  const [isOpenLiveChat, setOpenLiveChat] = useOpenLiveChat()
  return { isOpenLiveChat, setOpenLiveChat }
}
