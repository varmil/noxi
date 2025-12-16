import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { SuperAdminAside } from 'features/super-admin/components/SuperAdminAside'

export function SuperAdminDashboard() {
  return (
    <div className="flex min-h-screen w-full">
      <SuperAdminAside />
      <div className="flex flex-col flex-1">
        <header className="bg-background border-b border-border p-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold">Super Admin Dashboard</h1>
        </header>
        <main className="flex-1 p-6 grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>env</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                  <Label>NODE_ENV</Label>
                  <div className="font-medium">{process.env.NODE_ENV}</div>
                </div>
                <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                  <Label>ENV_NAME</Label>
                  <div className="font-medium">{process.env.ENV_NAME}</div>
                </div>
                <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                  <Label>BASE_URL</Label>
                  <div className="font-medium">{process.env.BASE_URL}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
