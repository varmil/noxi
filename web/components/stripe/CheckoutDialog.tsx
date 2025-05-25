'use client'

import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider
} from '@stripe/react-stripe-js'
import { X } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { getStripe } from 'utils/stripe'
import { fetchClientSecret } from './actions/stripeActions'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function CheckoutDialog({ open, onOpenChange }: Props) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="p-0 bg-white">
        <Button
          variant="ghost"
          size={'icon'}
          className={`absolute top-1 right-1 z-1 dark:hover:bg-black/10`}
          onClick={() => onOpenChange(false)}
        >
          <X className="size-4 text-black" />
        </Button>

        <ScrollArea className="min-h-[580px] max-h-[calc(100vh-14rem)] py-2">
          <AlertDialogHeader className="hidden">
            <AlertDialogTitle>月額パスに加入する</AlertDialogTitle>
            <AlertDialogDescription>
              月額パスに加入して、認証バッジの獲得や追加の応援チケットなどの特典をお楽しみください。
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div id="checkout" className="rounded-2xl">
            <EmbeddedCheckoutProvider
              stripe={getStripe()}
              options={{ fetchClientSecret }}
            >
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </div>

          {/* <AlertDialogFooter className="mt-6 px-6">
            <AlertDialogCancel>キャンセル</AlertDialogCancel>
          </AlertDialogFooter> */}
        </ScrollArea>
      </AlertDialogContent>
    </AlertDialog>
  )
}
