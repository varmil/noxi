import { Wrench, Clock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import './maintenance.css'

export const metadata = {
  title: 'メンテナンス中 | Under Maintenance'
}

export default function MaintenancePage() {
  return (
    <html>
      <body>
        <div className="maintenance-root">
          <div className="maintenance-bg" aria-hidden="true" />
          <div className="orb orb-1" aria-hidden="true" />
          <div className="orb orb-2" aria-hidden="true" />

          <main className="relative z-10 flex min-h-screen w-full items-center justify-center px-4 py-16">
            <div className="w-full max-w-md">
              {/* Icon badge */}
              <div className="mb-8 flex justify-center">
                <div className="icon-badge">
                  <Wrench
                    className="h-7 w-7 text-foreground/80 wrench-spin"
                    aria-hidden="true"
                  />
                </div>
              </div>

              {/* Main card */}
              <Card className="maintenance-card">
                <CardContent className="px-6 py-8 sm:px-10 sm:py-10">
                  {/* Status pill */}
                  <div className="mb-6 flex justify-center">
                    <span className="status-pill">
                      <span className="status-dot" aria-hidden="true" />
                      <span className="text-xs font-medium tracking-wide uppercase text-muted-foreground">
                        Under Maintenance
                      </span>
                    </span>
                  </div>

                  {/* Heading */}
                  <div className="mb-4 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground text-balance">
                      メンテナンス中
                    </h1>
                    <p className="mt-1 text-sm font-medium text-muted-foreground tracking-widest uppercase">
                      Under Maintenance
                    </p>
                  </div>

                  <Separator className="my-6 opacity-50" />

                  {/* Description */}
                  <div className="mb-6 space-y-3 text-center">
                    <p className="text-sm leading-relaxed text-foreground/80">
                      現在、サービスアップデートのためメンテナンスを実施しております。
                      ご不便をおかけし、大変申し訳ございません。
                    </p>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      We are currently performing scheduled maintenance to
                      improve our service. We apologize for any inconvenience
                      caused.
                    </p>
                  </div>

                  {/* Return time block */}
                  <div className="return-block">
                    <div className="flex items-center gap-2 justify-center mb-1">
                      <Clock
                        className="h-3.5 w-3.5 text-muted-foreground"
                        aria-hidden="true"
                      />
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        30分以内に復旧予定
                      </span>
                    </div>
                    <p className="text-center text-sm font-semibold text-foreground">
                      しばらくお待ちください
                    </p>
                    <p className="text-center text-xs text-muted-foreground mt-0.5">
                      Please wait a moment
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Footer note */}
              <p className="mt-6 text-center text-xs text-muted-foreground/60">
                ご理解とご協力に感謝いたします。&nbsp;
                <span className="opacity-70">Thank you for your patience.</span>
              </p>
            </div>
          </main>
        </div>
      </body>
    </html>
  )
}
