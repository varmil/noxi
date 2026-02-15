'use client'

import { Elements } from '@stripe/react-stripe-js'
import { Loader2, Tickets } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import {
  stripePromise,
  UseHyperChatFlowReturn
} from 'hooks/hyper-chat/useHyperChatFlow'
import { CompleteStepContent } from '../CompleteStepContent'
import { InputStepContent } from '../InputStepContent'
import { DesktopPaymentForm } from './DesktopPaymentForm'

type Props = {
  dialog: UseHyperChatFlowReturn
  channelTitle: string
}

export function DesktopHyperChatDialog({ dialog, channelTitle }: Props) {
  const t = useTranslations('Features.hyperChat')
  const {
    open,
    step,
    mode,
    selectedTier,
    price,
    isLoading,
    error,
    clientSecret,
    tickets,
    isLoadingTickets,
    form,
    maxChars,
    elementsOptions,
    channelThumbnailUrl,
    totalAmount,
    handleProceedToPayment,
    handleTierChange,
    handlePaymentSuccess,
    handleUseTicket,
    handleSwitchToFreeMode,
    handleBack,
    handleClose
  } = dialog

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="sm:max-w-md max-h-[85vh] overflow-y-auto"
        onOpenAutoFocus={e => e.preventDefault()}
      >
        {step === 'input' && (
          <>
            <DialogHeader>
              <DialogTitle className="mr-10 leading-normal">
                {t('dialog.title')}
              </DialogTitle>
              <DialogDescription hidden>
                {t('dialog.description')}
              </DialogDescription>
            </DialogHeader>

            <InputStepContent
              form={form}
              maxChars={maxChars}
              selectedTier={selectedTier}
              onTierChange={handleTierChange}
              onSelectFree={handleSwitchToFreeMode}
              isLoadingTickets={isLoadingTickets}
              tickets={tickets}
              mode={mode}
              error={error}
              channelTitle={channelTitle}
              channelThumbnailUrl={channelThumbnailUrl}
              totalAmount={totalAmount}
              price={price}
            />

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => handleClose(false)}
                disabled={isLoading}
              >
                {t('dialog.cancel')}
              </Button>
              {mode === 'paid' ? (
                <Button
                  onClick={handleProceedToPayment}
                  disabled={isLoading || !form.formState.isValid}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      {t('dialog.processing')}
                    </>
                  ) : (
                    t('dialog.payButton', { price: price.toLocaleString() })
                  )}
                </Button>
              ) : (
                <Button
                  onClick={handleUseTicket}
                  disabled={
                    isLoading ||
                    !form.formState.isValid ||
                    !form.watch('message')?.trim() // 無料チケは空文字を禁止
                  }
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      {t('dialog.processing')}
                    </>
                  ) : (
                    <>
                      <Tickets className="mr-2 size-4" />
                      {t('dialog.useTicket')}
                    </>
                  )}
                </Button>
              )}
            </div>
          </>
        )}

        {step === 'payment' && clientSecret && (
          <Elements stripe={stripePromise} options={elementsOptions}>
            <DesktopPaymentForm
              price={price}
              onSuccess={handlePaymentSuccess}
              onBack={handleBack}
            />
          </Elements>
        )}

        {step === 'complete' && (
          <>
            <DialogHeader>
              <DialogTitle>{t('dialog.complete.title')}</DialogTitle>
            </DialogHeader>
            <CompleteStepContent onClose={() => handleClose(false)} />
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
