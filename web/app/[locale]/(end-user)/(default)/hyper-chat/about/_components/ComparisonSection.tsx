import { useTranslations } from 'next-intl'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

const COL_KEYS = ['hyperChat', 'superChat', 'membership', 'sns'] as const

const ROWS = [
  {
    key: 'monetaryReturn',
    symbols: { hyperChat: '✕', superChat: '◯', membership: '◎', sns: '✕' }
  },
  {
    key: 'spreadEffect',
    symbols: { hyperChat: '◎', superChat: '✕', membership: '✕', sns: '◎' }
  },
  {
    key: 'assetValue',
    symbols: { hyperChat: '◎', superChat: '✕', membership: '◯', sns: '△' }
  },
  {
    key: 'talentBurden',
    symbols: { hyperChat: '◎', superChat: '△', membership: '△', sns: '△' }
  },
  {
    key: 'safety',
    symbols: { hyperChat: '◎', superChat: '◯', membership: '◎', sns: '✕' }
  }
] as const

export default function ComparisonSection() {
  const t = useTranslations('Pages.hyperChatAbout.comparison')

  return (
    <section className="py-16">
      <div className="container px-4 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-3 text-center text-2xl font-bold sm:text-3xl">
            {t('title')}
          </h2>
          <p className="mx-auto mb-8 max-w-3xl text-center text-muted-foreground">
            {t('subtitle')}
          </p>

          <div className="-mx-4 overflow-x-auto sm:mx-0">
            <Table className="min-w-[640px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[130px] min-w-[130px] sm:w-[160px] sm:min-w-[160px]">
                    {t('headers.feature')}
                  </TableHead>
                  {COL_KEYS.map(key => (
                    <TableHead
                      key={key}
                      className={`whitespace-nowrap text-sm text-center ${key === 'hyperChat' ? 'bg-primary/20 font-bold' : ''}`}
                    >
                      <div>{t(`headers.${key}`)}</div>
                      <div className="text-[10px] sm:text-xs font-normal text-muted-foreground mt-[1px]">
                        {t(`headers.${key}Sub`)}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {ROWS.map(({ key, symbols }) => (
                  <TableRow key={key}>
                    <TableCell className="text-sm whitespace-nowrap font-medium py-3">
                      <div>{t(`rows.${key}.label`)}</div>
                      {t(`rows.${key}.labelSub`) && (
                        <div className="text-xs text-muted-foreground">
                          {t(`rows.${key}.labelSub`)}
                        </div>
                      )}
                    </TableCell>
                    {COL_KEYS.map(col => {
                      const sub = t(`rows.${key}.${col}`)
                      return (
                        <TableCell
                          key={col}
                          className={`text-center py-3 ${col === 'hyperChat' ? 'bg-primary/20' : ''}`}
                        >
                          <div className="text-lg">{symbols[col]}</div>
                          {sub && (
                            <div className="whitespace-nowrap text-xs text-muted-foreground">
                              {sub}
                            </div>
                          )}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <p className="mt-10 text-center text-sm text-muted-foreground">
            {t('summaryLine1')}
            <br />
            {t('summaryLine2')}
          </p>
        </div>
      </div>
    </section>
  )
}
