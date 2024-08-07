import { Plane } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import Image from 'components/styles/Image'
import IconBlock from 'features/icon-section/IconBlock'

export default function IconSectionForReview() {
  return (
    <>
      <section className="py-4">
        <h3 className="mb-2 text-2xl lg:text-3xl">VTubers</h3>
        <div className="grid gap-2">
          <IconBlock
            href="/hololive/charts/channels"
            image={
              <Image
                src={'/top_logo_hololive.svg'}
                alt={`ホロライブ`}
                width={734 / 2}
                height={518 / 2}
                className=""
              />
            }
            description={
              'ホロライブとは、カバー株式会社が運営するバーチャルYouTuber（VTuber）事務所「ホロライブプロダクション」に所属する女性VTuberグループです。ホロライブのメンバーは、ゲーム実況や歌、雑談、コラボ配信など、さまざまなライブ配信を行っています。個性豊かなメンバーが在籍しており、ホロライブ間でのコラボも多いのが特徴です。また、カバー株式会社のVR/AR技術を活用して、リアル会場でのライブ活動なども行っています。ホロライブは国内外で人気を博しており、YouTube総チャンネル登録者数は約8,000万人を超えています。日本のゲームやコンテンツを世界中にリーチできることも強みの一つです。視聴者の年齢層は18歳～24歳が約45％、25歳～34歳が約30％と、若者が中心となっています。'
            }
          />
        </div>

        <Separator className="my-2 sm:my-4" />

        <h3 className="mb-2 text-2xl lg:text-3xl">Travel</h3>
        <div className="grid gap-2">
          <IconBlock
            href="/youtube/charts/channels"
            icon={
              <Plane className="flex-shrink-0 w-6 h-6 text-primary-foreground" />
            }
            title="Travel Vlogs"
            description={
              "A travel vlog is a video content that records memories from a travel destination. There are various styles, such as works that focus on the journey rather than tourist spots and activities, and formats in which you capture your own figure and face using a selfie stick or tripod. Because Vlogs are recorded with video and audio, they can leave a sense of realism that cannot be conveyed in words. They can also express personal aspects such as the poster's humanity and values."
            }
          />
        </div>
      </section>
    </>
  )
}
