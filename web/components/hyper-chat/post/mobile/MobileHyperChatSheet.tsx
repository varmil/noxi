'use client'

import { Elements } from '@stripe/react-stripe-js'
import { Loader2, Tickets } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'
import {
  stripePromise,
  UseHyperChatFlowReturn
} from 'hooks/hyper-chat/useHyperChatFlow'
import { CompleteStepContent } from '../CompleteStepContent'
import { InputStepContent } from '../InputStepContent'
import { MobilePaymentForm } from './MobilePaymentForm'

type Props = {
  dialog: UseHyperChatFlowReturn
  channelTitle: string
}

export function MobileHyperChatSheet({ dialog, channelTitle }: Props) {
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
    handleProceedToPayment,
    handleTierChange,
    handlePaymentSuccess,
    handleUseTicket,
    handleSwitchToFreeMode,
    handleBack,
    handleClose
  } = dialog

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent
        side="bottom"
        className="h-full"
        onOpenAutoFocus={e => e.preventDefault()}
      >
        {step === 'input' && (
          <>
            <SheetHeader>
              <SheetTitle className="mr-10">
                {t('dialog.title', { channel: channelTitle })}
              </SheetTitle>
              <SheetDescription>{t('dialog.description')}</SheetDescription>
            </SheetHeader>
            <div className="px-4 pb-4">
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
                    disabled={isLoading || !form.formState.isValid}
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
            </div>
          </>
        )}

        {step === 'payment' && clientSecret && (
          <Elements stripe={stripePromise} options={elementsOptions}>
            <MobilePaymentForm
              price={price}
              onSuccess={handlePaymentSuccess}
              onBack={handleBack}
            />
          </Elements>
        )}

        {step === 'complete' && (
          <>
            <SheetHeader>
              <SheetTitle>{t('dialog.complete.title')}</SheetTitle>
            </SheetHeader>
            <div className="px-4 pb-4">
              <CompleteStepContent onClose={() => handleClose(false)} />
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
