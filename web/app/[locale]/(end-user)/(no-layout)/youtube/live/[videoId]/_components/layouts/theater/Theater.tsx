'use client'

import { ComponentProps } from 'react'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '@/components/ui/resizable'
import { useGlobalRotate180 } from '../../../_hooks/youtubeLiveStates'

/**
 * XS (smartphone) でのみrotate
 * SM (tablet) 以上ではrotateしない
 */
export function Theater({
  children,
  ...props
}: ComponentProps<typeof ResizablePanelGroup>) {
  const { isRotate180 } = useGlobalRotate180()

  const pClass = `\
      w-screen h-screen \
      sm:contents sm:w-[inherit] sm:h-[inherit] \
    `
  const rotateClass = !isRotate180
    ? `rotate-90 mt-[calc((100vh-100vw)/2)] -ml-[calc((100vh-100vw)/2)]`
    : '-rotate-90 mt-[calc((100vh-100vw)/2)] -ml-[calc((100vh-100vw)/2)]'

  const cClass = `flex ${rotateClass} \
       w-[100vh] h-[100vw] transform-gpu \
       sm:rotate-0 sm:w-full sm:h-screen sm:transform-none sm:mt-0 sm:ml-0`

  return (
    <ResizablePanelGroup {...props}>
      <div className={pClass}>
        <div className={cClass}>{children}</div>
      </div>
    </ResizablePanelGroup>
  )
}

export function TheaterContent(props: ComponentProps<typeof ResizablePanel>) {
  return <ResizablePanel {...props} />
}

export function ResizeHandle(props: ComponentProps<typeof ResizableHandle>) {
  return (
    <ResizableHandle
      withHandle
      className="bg-gray-700 hover:bg-border"
      {...props}
    />
  )
}
