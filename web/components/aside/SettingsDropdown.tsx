'use client'

import * as React from 'react'
import { Globe, Moon, Settings } from 'lucide-react'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import { useLocale } from 'next-intl'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import SignOut from 'components/auth/SignOutButton'
import LanguageLink from 'components/language-switcher/components/LanguageLink'

export function SettingsDropdown({ session }: { session: Session | null }) {
  const { setTheme, resolvedTheme } = useTheme()
  const locale = useLocale()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="size-6 text-muted-foreground" />
          <span className="sr-only">Open Settings</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72" align="start" side="right">
        <DropdownMenuLabel className="font-bold">Settings</DropdownMenuLabel>
        <DropdownMenuGroup>
          <div className="flex items-center justify-between px-2 py-1.5">
            <div className="flex items-center">
              <Moon className="mr-2 h-4 w-4" />
              <span className="text-sm">ダークモード</span>
            </div>
            <button
              onClick={() =>
                setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
              }
              className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                resolvedTheme === 'light' ? 'bg-gray-200' : 'bg-primary'
              }`}
            >
              <span
                className={`pointer-events-none relative inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  resolvedTheme === 'light' ? 'translate-x-0' : 'translate-x-5'
                }`}
              />
            </button>
          </div>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <div className="flex items-center">
                <Globe className="mr-2 h-4 w-4" />
                <span className="text-sm">言語</span>
              </div>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup value={locale}>
                  <DropdownMenuRadioItem value="ja">
                    <LanguageLink locale="ja">日本語</LanguageLink>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="en">
                    <LanguageLink locale="en">English</LanguageLink>
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-bold">
            現在のプラン
          </DropdownMenuLabel>
          <div className="flex items-center justify-between px-2 py-1.5">
            <div className="text-sm">
              <div>無料プラン</div>
              <div className="text-xs text-muted-foreground">基本機能のみ</div>
            </div>
            <Button size="sm" variant="outline" disabled>
              アップグレード
            </Button>
          </div>
        </DropdownMenuGroup>
        {session ? (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => signOut({ redirectTo: '/auth/signin' })}
            >
              <SignOut />
            </DropdownMenuItem>
          </>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
