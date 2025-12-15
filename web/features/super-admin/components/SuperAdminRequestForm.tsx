'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { requestFromSuperAdmin } from 'features/super-admin/api/requestFromSuperAdmin'

const formSchema = z.object({
  httpMethod: z.string(),
  url: z
    .string({
      required_error: 'Please enter url to request.'
    })
    .url(),
  body: z.string().optional(),
  headers: z.string().optional()
})

type FormValues = z.infer<typeof formSchema>

const defaultValues: Partial<FormValues> = {
  httpMethod: 'POST',
  url: 'http://localhost:15000/api/cloud-schedulers/youtube/channels-by-search'
}

export function SuperAdminRequestForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: 'onChange'
  })

  const onSubmit = async (data: FormValues) => {
    console.log('submitted', data)

    try {
      await requestFromSuperAdmin(data)

      toast('You submitted the following values:', {
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        )
      })
    } catch {
      toast.error('Uh oh! Something went wrong.', {
        description: 'There was a problem with your request.'
      })
    }
  }

  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name={'httpMethod'}
          render={({ field }) => (
            <FormItem className="grid grid-cols-[120px_1fr] items-center gap-4">
              <FormLabel>HTTP Method</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select HTTP method" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="GET">GET</SelectItem>
                  <SelectItem value="POST">POST</SelectItem>
                  <SelectItem value="PUT">PUT</SelectItem>
                  <SelectItem value="DELETE">DELETE</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem className="grid grid-cols-[120px_1fr] items-center gap-4">
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="http://localhost:15000/api/cloud-schedulers/youtube/channels-by-search"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem className="grid grid-cols-[120px_1fr] items-center gap-4">
              <FormLabel>Request Body</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='{ "key": "value" }'
                  className="resize"
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="headers"
          render={({ field }) => (
            <FormItem className="grid grid-cols-[120px_1fr] items-center gap-4">
              <FormLabel>Headers</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Content-Type: application/json"
                  className="resize"
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit">Send Request</Button>
        </div>
      </form>
    </Form>
  )
}
