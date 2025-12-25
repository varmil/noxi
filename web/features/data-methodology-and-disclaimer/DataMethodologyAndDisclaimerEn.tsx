import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export default function DataMethodologyAndDisclaimerEn() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4 md:px-6 mb-44">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Data Methodology & Disclaimer
          </h1>
          <p className="mt-2 text-muted-foreground">
            How VCharts calculates data and important notices
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Overview & Population</CardTitle>
            <CardDescription>About the data scope and targets</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-relaxed">
              This report is based on measurement data independently collected by
              VCharts. It does not guarantee the absolute value of talents or
              their future profitability.
            </p>
            <div className="rounded-lg border p-3">
              <p className="text-xs text-muted-foreground">Target</p>
              <p className="text-lg font-semibold">
                846 VCharts-registered talents
              </p>
              <p className="text-xs text-muted-foreground">As of December 2025</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Aggregation Definitions & Specifications</CardTitle>
            <CardDescription>How each metric is calculated</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <h3 className="font-semibold">
                Concurrent Viewers (Max CCV)
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    We use the &quot;maximum concurrent viewers&quot; for each stream
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    Metrics such as &quot;median&quot; in reports are calculated based on
                    these &quot;maximum values per stream&quot;
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    No bot filtering or corrections are applied; raw API values
                    are used
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Polling interval: 2 minutes</span>
                </li>
              </ul>
            </div>

            <Separator />

            <div className="space-y-3">
              <h3 className="font-semibold">Super Chat</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    To reduce server load, only events occurring between stream
                    start and end are aggregated
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    Amounts during waiting rooms and premiere broadcasts are not
                    included. Please note that totals may be lower than actual
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    When comment flow is extremely high, some data may be missed
                    due to API limitations
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Polling interval: 5 seconds</span>
                </li>
              </ul>
            </div>

            <Separator />

            <div className="space-y-3">
              <h3 className="font-semibold">Population Changes</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                More than 300 talents have been added to the database during
                the aggregation period. Please note that fluctuations and
                trends, especially in the indie category, include this
                &quot;increase in measurement targets&quot;.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Disclaimer</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Measurement logic may be adjusted without notice for quality
              improvement. Important changes will be announced on the site or X.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
