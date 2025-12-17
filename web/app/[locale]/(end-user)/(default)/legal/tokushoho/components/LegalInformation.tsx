import { Card, CardContent } from '@/components/ui/card'

export function LegalInformation() {
  return (
    <Card>
      <CardContent className="p-6 space-y-6 text-sm">
        <h3 className="text-lg font-medium">特定商取引法に基づく表記</h3>

        <div className="space-y-4">
          <Item useGrid>
            <div className="font-medium">販売事業者名</div>
            <div className="md:col-span-2">山本晃大（VCharts運営）</div>
          </Item>
          <Item useGrid>
            <div className="font-medium">所在地</div>
            <div className="md:col-span-2">
              〒000-0000 東京都渋谷区○○1-2-3 ○○ビル5F
            </div>
          </Item>
          <Item useGrid>
            <div className="font-medium">電話番号</div>
            <div className="md:col-span-2">03-1234-5678</div>
          </Item>
          <Item useGrid>
            <div className="font-medium">お問合せ先</div>
            <div className="md:col-span-2">
              <a href="mailto:support@vcharts.net" className="underline">
                support@vcharts.net
              </a>
            </div>
          </Item>

          <Item useGrid>
            <div className="font-medium">販売URL</div>
            <div className="md:col-span-2">
              <a
                href="https://www.vcharts.net"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                https://www.vcharts.net
              </a>
            </div>
          </Item>
        </div>

        <div className="space-y-4 pt-4 border-t">
          <Item>
            <h4 className="font-medium">商品名</h4>
            <p>月額パス</p>
          </Item>

          <Item>
            <h4 className="font-medium">商品価格</h4>
            <p>月額590円（税込）</p>
          </Item>

          <Item>
            <h4 className="font-medium">販売価格以外にご負担いただく費用</h4>
            <p>
              アプリをご利用いただくために必要なインターネット接続環境、ソフトウェア、通信料金等はお客様の負担となります。
            </p>
          </Item>

          <Item>
            <h4 className="font-medium">送料</h4>
            <p>インターネット上の商品のため、送料は発生いたしません。</p>
          </Item>

          <Item>
            <h4 className="font-medium">お支払い方法</h4>
            <p>決済サービスStripeを用いたクレジットカード決済</p>
          </Item>

          <Item>
            <h4 className="font-medium">お支払いの時期</h4>
            <p>
              登録時に指定したお支払い方法に従って毎月自動的に請求されます。
            </p>
          </Item>

          <Item>
            <h4 className="font-medium">商品の引き渡し時期</h4>
            <p>決済完了後、ただちにご利用いただけます。</p>
          </Item>

          <Item>
            <h4 className="font-medium">解約について</h4>
            <p>
              マイページより解約可能です。日割りでの返金は行っておりません。
            </p>
          </Item>

          <Item>
            <h4 className="font-medium">返金・交換等および免責事項</h4>
            <p>
              弊社はサーバトラブル、ネットワークトラブルその他不可抗力により生じたサービス・商品の提供不能、中断等については一切その責任を負わないものとします。またデジタルアイテム購入後のお客様のご都合による返金はお受けできません。
            </p>
          </Item>
        </div>
      </CardContent>
    </Card>
  )
}

const Item = ({
  useGrid,
  children
}: {
  useGrid?: boolean
  children: React.ReactNode
}) => (
  <div
    className={useGrid ? 'grid grid-cols-1 md:grid-cols-3 gap-1' : 'space-y-1'}
  >
    {children}
  </div>
)
