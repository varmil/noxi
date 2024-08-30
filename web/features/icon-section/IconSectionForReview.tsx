import { useTranslations } from 'next-intl'
import Image from 'components/styles/Image'
import IconBlock from 'features/icon-section/IconBlock'

export default function IconSectionForReview() {
  const t = useTranslations('Page.index.section')

  return (
    <>
      <section className="py-4">
        <h3 className="mb-2 text-2xl lg:text-3xl">VTubers</h3>
        <div className="grid gap-6">
          <IconBlock
            href="/hololive"
            image={
              <Image
                src={'/hololive/top_logo_hololive.svg'}
                alt={`ホロライブ`}
                width={734 / 2}
                height={518 / 2}
              />
            }
            title={t('hololive.title')}
            description={t('hololive.description')}
          />
          <IconBlock
            href="/hololive-english"
            image={
              <Image
                src={'/hololive/top_logo_hololive_en.svg'}
                alt={`Hololive English`}
                width={734 / 2}
                height={518 / 2}
              />
            }
            title={t('hololive-english.title')}
            description={t('hololive-english.description')}
          />
          <IconBlock
            href="/hololive-indonesia"
            image={
              <Image
                src={'/hololive/top_logo_hololive_id.svg'}
                alt={`Hololive Indonesia`}
                width={734 / 2}
                height={518 / 2}
              />
            }
            title={t('hololive-indonesia.title')}
            description={t('hololive-indonesia.description')}
          />
        </div>
      </section>
    </>
  )
}
