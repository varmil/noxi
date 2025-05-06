'use client'

import Script, { type ScriptProps } from 'next/script'
import { useTheme } from 'next-themes'

/** @deprecated SwGは使わない見通しなのでいずれ削除する */
export const SWGScript: React.FC<ScriptProps> = (props: ScriptProps) => {
  const { theme } = useTheme()
  if (process.env.ENV_NAME !== 'production') return null
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
