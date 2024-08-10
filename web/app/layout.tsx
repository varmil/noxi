import './globals.css'
import { ReactNode } from 'react'

export const fetchCache = 'default-cache'
// export const runtime = 'edge'

type Props = {
  children: ReactNode
}

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({ children }: Props) {
  return children
}
