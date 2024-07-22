import { headers } from 'next/headers'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu'
import { Label } from '@/components/ui/label'
import { SuperAdminAside } from 'features/super-admin/components/SuperAdminAside'
import { SuperAdminRequestForm } from 'features/super-admin/components/SuperAdminRequestForm'

export function SuperAdminDashboard() {
  return (
    <div className="flex min-h-screen w-full">
      <SuperAdminAside />
      <div className="flex flex-col flex-1">
        <header className="bg-background border-b border-border p-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold">Admin Dashboard</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <img
                  src="/placeholder.svg"
                  width="32"
                  height="32"
                  className="rounded-full"
                  alt="Avatar"
                />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex-1 p-6 grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Make API Request</CardTitle>
              <CardDescription>
                Use the form below to make API requests and view the response.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SuperAdminRequestForm />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Response</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                  <Label>Status Code</Label>
                  <div className="font-medium">200 OK</div>
                </div>
                <div className="grid grid-cols-[120px_1fr] items-start gap-4">
                  <Label>Response Body</Label>
                  <pre className="bg-muted p-4 rounded-md overflow-auto">{`{
  "data": [
    { "id": 1, "name": "Item 1" },
    { "id": 2, "name": "Item 2" },
    { "id": 3, "name": "Item 3" }
  ]
}`}</pre>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Request Headers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-[120px_1fr] items-start gap-4">
                  <Label>value</Label>
                  <pre className="bg-muted p-4 rounded-md overflow-auto">
                    {JSON.stringify(headers(), null, 2)}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
