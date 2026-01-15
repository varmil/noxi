import Script, { type ScriptProps } from 'next/script'

/** @deprecated Adsense使わないので削除してもいいかも */
export const AdsByGoogleScript: React.FC<ScriptProps> = (
  props: ScriptProps
) => {
  if (process.env.ENV_NAME !== 'production') return null
  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4929947179869258"
      crossOrigin="anonymous"
      {...props}
    />
  )
}
