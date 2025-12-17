'use server'

import { revalidateTag } from 'next/cache'
import { AFTER_CONSUME_CHEER_TICKETS } from 'apis/tags/revalidate-tags'

export async function revalidateAfterConsumeCheetTickets(): Promise<void> {
  revalidateTag(AFTER_CONSUME_CHEER_TICKETS, 'max')
}
