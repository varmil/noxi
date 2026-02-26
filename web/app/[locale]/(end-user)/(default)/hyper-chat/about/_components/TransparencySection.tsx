import { Code, Server, ShieldCheck } from 'lucide-react'
import { useTranslations } from 'next-intl'

const ITEMS = [
  { key: 'server', icon: Server },
  { key: 'development', icon: Code },
  { key: 'operation', icon: ShieldCheck }
] as const

export default function TransparencySection() {
  const t = useTranslations('Pages.hyperChatAbout.transparency')

  return (
    <section className="py-16">
      <div className="container px-4 sm:px-6">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-2 text-center text-2xl font-bold sm:text-3xl">
            {t('title')}
          </h2>
          <p className="mb-6 text-center text-sm text-muted-foreground">
            {t('description')}
          </p>
          <ul className="w-[260px] space-y-3 mx-auto">
            {ITEMS.map(({ key, icon: Icon }) => (
              <li key={key} className="flex items-center gap-3">
                <Icon className="size-5 shrink-0 text-muted-foreground" />
                <span className="text-sm">{t(`items.${key}`)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
