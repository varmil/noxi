import Script, { type ScriptProps } from 'next/script'

export const ClarityScript: React.FC<ScriptProps> = (props: ScriptProps) => {
  const code = process.env.CLARITY_CODE
  if (!code) return null
  return (
    <Script
      // workaround: https://github.com/microsoft/clarity/issues/247
      id="msClarity"
      dangerouslySetInnerHTML={{
        __html: `
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "${code}");
      `
      }}
      {...props}
    />
  )
}
