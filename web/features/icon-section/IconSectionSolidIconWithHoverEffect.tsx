import { Axe, Gamepad2, Play, Rainbow } from 'lucide-react'
import IconBlock from 'features/icon-section/IconBlock'

export default function IconSectionSolidIconWithHoverEffect() {
  return (
    <>
      <section className="py-4">
        <h3 className="mb-2 text-2xl lg:text-3xl">ゲーム</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-2">
          <IconBlock
            href="/youtube/queries/apex/channels"
            icon={
              <Axe className="flex-shrink-0 w-6 h-6 text-primary-foreground" />
            }
            title="Apex Legends"
            description={
              '「エーペックスレジェンズ」は伝説の戦士が結集してフロンティアの辺境で富と名声を懸けて戦う、基本プレイ無料のヒーローシューター。'
            }
          />
          <IconBlock
            href="/youtube/queries/ff14/channels"
            icon={
              <Gamepad2 className="flex-shrink-0 w-6 h-6 text-primary-foreground" />
            }
            title="FF14"
            description="冒険者3000万突破のオンラインRPG。全ての冒険者よ、集え 仲間たちの待つエオルゼアの地へ。"
          />
        </div>
      </section>

      <section className="py-4">
        <h3 className="mb-2 text-2xl lg:text-3xl">VTuber</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-2">
          <IconBlock
            href="/youtube/queries/hololive/channels"
            icon={
              <Play className="flex-shrink-0 w-6 h-6 text-primary-foreground" />
            }
            title="ホロライブ"
            description="ゲーム実況や歌、雑談やコラボ配信などバラエティ豊かなライブ配信をしています。"
          />
          <IconBlock
            href="/youtube/queries/nijisanji/channels"
            icon={
              <Rainbow className="flex-shrink-0 w-6 h-6 text-primary-foreground" />
            }
            title="にじさんじ"
            description="個性豊かな約150名のライバーが所属し、YouTubeなどの動画配信プラットフォームで活動しています。"
          />
        </div>
      </section>
    </>
  )
}
