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
import { revalidateTagAction } from 'apis/revalidate/revalidateTagAction'

const formSchema = z.object({
  tag: z.string().min(1, 'タグを入力してください')
})

type FormValues = z.infer<typeof formSchema>

export function RevalidateTagForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { tag: '' }
  })

  const onSubmit = async (data: FormValues) => {
    try {
      await revalidateTagAction(data.tag)
      toast.success(`タグ "${data.tag}" を revalidate しました`)
    } catch {
      toast.error('revalidate に失敗しました')
    }
  }

  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="tag"
          render={({ field }) => (
            <FormItem className="grid grid-cols-[120px_1fr] items-center gap-4">
              <FormLabel>Tag</FormLabel>
              <FormControl>
                <Input placeholder="e.g. groups" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit">Revalidate</Button>
        </div>
      </form>
    </Form>
  )
}
