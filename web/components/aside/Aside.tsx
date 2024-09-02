import { useTranslations } from 'next-intl'
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent
} from '@/components/ui/tooltip'
import AsideIcon from 'components/aside/AsideIcon'
import PrivacyPolicyIcon from 'components/icons/PrivacyPolicyIcon'
import { Link } from 'lib/navigation'
import Logo from '../Logo'

export default function Aside() {
  const t = useTranslations('Global')

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-16 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <TooltipProvider>
          <Link
            href="/"
            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-secondary"
            prefetch={false}
          >
            <Logo className="h-5 w-5 transition-all group-hover:scale-110" />
            <span className="sr-only">{t('title')}</span>
          </Link>
          <AsideIcon
            name={`Hololive`}
            href="/hololive"
            src="/hololiveicon.png"
          />
          <AsideIcon
            name={`Hololive English`}
            href="/hololive-english"
            src="/hololive/hololive_en_square.png"
            roundedFull
          />
          <AsideIcon
            name={`Hololive Indonesia`}
            href="/hololive-indonesia"
            src="/hololive/hololive_id_square.png"
            roundedFull
          />

          {/* <AsideIcon name={`Youtube`} href="/" src="/yt_icon_rgb.png" /> */}

          {/* <Tooltip>
            <TooltipTrigger>
              <Link
                href="#"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                prefetch={false}
              >
                <TwitchIcon className="h-6 w-6" />
                <span className="sr-only">Twitch</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              Twitch | Coming soon...
            </TooltipContent>
          </Tooltip> */}
          {/* <Tooltip>
            <TooltipTrigger>
              <Link
                href="#"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                prefetch={false}
              >
                <TikTokIcon className="h-6 w-6" />
                <span className="sr-only">TikTok</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              TikTok | Coming soon...
            </TooltipContent>
          </Tooltip> */}
          {/* <Tooltip>
            <TooltipTrigger>
              <Link
                href="#"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                prefetch={false}
              >
                <InstagramIcon className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              Instagram | Coming soon...
            </TooltipContent>
          </Tooltip> */}
        </TooltipProvider>
      </nav>

      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <TooltipProvider>
          {/* <Tooltip>
            <TooltipTrigger>
              <Link
                href="#"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                prefetch={false}
              >
                <SettingsIcon className="h-6 w-6" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip> */}
          <Tooltip>
            <TooltipTrigger>
              <Link
                href="/youtube/terms-of-use-and-privacy-policy"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                prefetch={false}
              >
                <PrivacyPolicyIcon className="h-6 w-6" />
                <span className="sr-only">Terms of Use and Privacy Policy</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              Terms of Use and Privacy Policy
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  )
}
