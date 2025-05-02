'use client'

import Script, { type ScriptProps } from 'next/script'
import { useTheme } from 'next-themes'

export const SWGScript: React.FC<ScriptProps> = (props: ScriptProps) => {
  const { theme } = useTheme()
  return (
    <>
      <Script
        async
        type="application/javascript"
        src="https://news.google.com/swg/js/v1/swg-basic.js"
        {...props}
      />

      <script
        dangerouslySetInnerHTML={{
          __html: `
            (self.SWG_BASIC = self.SWG_BASIC || []).push(basicSubscriptions => {
              basicSubscriptions.init({
                type: "NewsArticle",
                isPartOfType: ["Product"],
                isPartOfProductId: "CAow4su6DA:openaccess",
                clientOptions: { theme: "${theme ?? 'light'}", lang: "ja" },
              });
            });
          `
        }}
      />
    </>
  )
}
