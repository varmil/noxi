import { CircleHelp } from 'lucide-react'
import { useTranslations } from 'next-intl'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { TIERS, TIER_CONFIG } from 'apis/hyper-chats/hyperChatSchema'
import { TIER_DOT_COLORS } from 'components/hyper-chat/tier-styles'

export default function TierTable() {
  const t = useTranslations('Pages.hyperChatAbout.features.tierTable')
  const tierT = useTranslations('Features.hyperChat.dialog')

  return (
    <div>
      <div className="-mx-4 overflow-x-auto sm:mx-0">
        <Table className="min-w-[480px]">
          <TableHeader>
            <TableRow>
              <TableHead className="whitespace-nowrap">{t('tier')}</TableHead>
              <TableHead className="whitespace-nowrap">{t('price')}</TableHead>
              <TableHead className="whitespace-nowrap">
                {t('maxChars')}
              </TableHead>
              <TableHead className="whitespace-nowrap">
                <span className="flex items-center gap-1">
                  {t('displayPriority')}
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <CircleHelp className="size-4" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-72 p-4 text-sm">
                      <p className="mb-2 font-semibold">
                        {t('displayPriorityPopover.title')}
                      </p>
                      <ul className="list-disc space-y-1 pl-4 font-normal">
                        <li>{t('displayPriorityPopover.item1')}</li>
                        <li>{t('displayPriorityPopover.item2')}</li>
                        <li>{t('displayPriorityPopover.item3')}</li>
                      </ul>
                    </PopoverContent>
                  </Popover>
                </span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {TIERS.map(tier => {
              const config = TIER_CONFIG[tier]
              const features = tierT.raw(`tierFeatures.${tier}`) as string[]
              return (
                <TableRow key={tier}>
                  <TableCell className="whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-block size-2.5 rounded-full ${TIER_DOT_COLORS[tier]}`}
                      />
                      <span className="font-medium">
                        {tierT(`tier.${tier}`)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {config.price === 0
                      ? t('free')
                      : `¥${config.price.toLocaleString()}`}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {t('charsUnit', {
                      count: config.maxChars.toLocaleString()
                    })}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {features[0]}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
