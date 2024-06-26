import './globals.css'
import { GoogleTagManager } from '@next/third-parties/google'
import { Metadata } from 'next'
import Site from './config/constants/Site'
import Aside from '../components/Aside'

export const metadata: Metadata = {
  title: `${Site.TITLE}`,
  description:
    'This example shows how to use Next.js along with Google Analytics.'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GA_ID as string} />
      <body>
        <Aside />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 bg-muted/40">
          {children}
        </div>
      </body>
    </html>
  )
}
