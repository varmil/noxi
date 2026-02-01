'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { TIER_CONFIG, TierValue } from 'apis/hyper-chats/hyperChatSchema'
import { useHyperChatMessageSchema } from './useHyperChatMessageSchema'

export type HyperChatFormValues = {
  message: string
}

export function useHyperChatForm(selectedTier: TierValue) {
  const maxChars = TIER_CONFIG[selectedTier].maxChars
  const messageSchema = useHyperChatMessageSchema(selectedTier)

  const formSchema = z.object({
    message: messageSchema
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { message: '' },
    mode: 'onChange'
  })

  const message = useWatch({ control: form.control, name: 'message' })

  return { form, message, maxChars }
}
