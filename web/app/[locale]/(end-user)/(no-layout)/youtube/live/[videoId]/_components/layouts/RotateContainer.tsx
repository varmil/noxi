import { PropsWithChildren } from 'react'

/**
 * XS (smartphone) でのみrotate
 * SM (tablet) 以上ではrotateしない
 */
export default function RotateContainer({ children }: PropsWithChildren) {
  const pClass = `overflow-hidden \
      w-screen h-screen \
      sm:contents sm:w-[inherit] sm:h-[inherit] \
    `
  const cClass = `flex \
      rotate-90 transform-gpu mt-[calc((100vh-100vw)/2)] -ml-[calc((100vh-100vw)/2)] w-[100vh] h-[100vw] \
      sm:transform-none sm:mt-0 sm:ml-0 sm:w-full sm:h-screen`

  return (
    <section className={pClass}>
      <div className={cClass}>{children}</div>
    </section>
  )
}
