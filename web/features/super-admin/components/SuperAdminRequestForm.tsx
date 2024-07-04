'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@radix-ui/react-select'
import { FormEventHandler } from 'react'

export function SuperAdminRequestForm() {
  const onSubmit: FormEventHandler<HTMLFormElement> = e => {
    console.log('submitted', e)
    e.preventDefault()
  }

  return (
    <form className="grid gap-4" onSubmit={onSubmit}>
      <div className="grid grid-cols-[120px_1fr] items-center gap-4">
        <Label htmlFor="method">HTTP Method</Label>
        <Select defaultValue="GET">
          <SelectTrigger>
            <SelectValue placeholder="Select HTTP method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="GET">GET</SelectItem>
            <SelectItem value="POST">POST</SelectItem>
            <SelectItem value="PUT">PUT</SelectItem>
            <SelectItem value="DELETE">DELETE</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-[120px_1fr] items-center gap-4">
        <Label htmlFor="url">URL</Label>
        <Input
          id="url"
          type="text"
          placeholder="https://api.example.com/endpoint"
        />
      </div>
      <div className="grid grid-cols-[120px_1fr] items-center gap-4">
        <Label htmlFor="body">Request Body</Label>
        <Textarea id="body" rows={4} placeholder='{ "key": "value" }' />
      </div>
      <div className="grid grid-cols-[120px_1fr] items-center gap-4">
        <Label htmlFor="headers">Headers</Label>
        <Textarea
          id="headers"
          rows={4}
          placeholder="Content-Type: application/json"
        />
      </div>
      <div className="flex justify-end">
        <Button type="submit">Send Request</Button>
      </div>
    </form>
  )
}
