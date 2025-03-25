import { HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@/components/ui/popover'

export default function HowToCheckChannelIdPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="size-6 border-none">
          <HelpCircle className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4">
        <div className="space-y-4">
          <h4 className="text-base font-medium">
            YouTubeチャンネルIDの確認方法
          </h4>
          <div className="text-sm space-y-1">
            <p className="font-semibold">《 確認手順 》</p>
            <div className="space-y-2">
              <Li>
                <span>1.</span>チャンネルページを開く
              </Li>
              <Li>
                <span>2.</span>チャンネルの概要欄(説明欄)をクリック
              </Li>
              <Li>
                <span>3.</span>
                <p>
                  <span className="font-bold">概要</span>が表示される
                </p>
              </Li>
              <Li>
                <span>4.</span>
                <p>
                  <span className="font-bold">概要</span>
                  の一番下の『チャンネルを共有』をクリック
                </p>
              </Li>
              <Li>
                <span>5.</span>『チャンネルIDをコピー』をクリック
              </Li>
              <Li>
                <span>6.</span>これで チャンネルID を取得できます
              </Li>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

const Li = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-baseline gap-2">{children}</div>
)
