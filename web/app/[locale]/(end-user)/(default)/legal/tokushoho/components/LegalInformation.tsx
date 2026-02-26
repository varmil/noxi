type TableRowProps = {
  label: string
  children: React.ReactNode
}

function TableRow({ label, children }: TableRowProps) {
  return (
    <tr className="border-b">
      <th className="py-4 w-1/3 font-semibold text-muted-foreground text-left align-top">
        {label}
      </th>
      <td className="py-4">{children}</td>
    </tr>
  )
}

export function LegalInformation() {
  return (
    <div className="max-w-3xl mx-auto px-4 md:p-12">
      <h1 className="text-2xl font-bold mb-8">特定商取引法に基づく表記</h1>

      <table className="w-full text-sm text-left border-collapse">
        <tbody>
          {/* 基本情報（共通） */}
          <TableRow label="販売業者">VCharts</TableRow>

          <TableRow label="運営統括責任者">山本晃大</TableRow>

          <TableRow label="所在地・電話">
            消費者庁の規定に基づき、請求があり次第遅滞なく開示いたします。
            <br />
            開示をご希望の場合は、以下の連絡先までお問い合わせください。
          </TableRow>

          <TableRow label="連絡先">
            <a href="mailto:support@vcharts.net" className="underline">
              support@vcharts.net
            </a>
          </TableRow>

          {/* 金額・支払いについて */}
          <TableRow label="販売価格">
            <p className="mb-2">
              各商品・プランの申し込みページに表示された金額（表示価格・消費税込）とします。ハイパーチャットは下記のとおりです。
            </p>
            <ul className="space-y-1">
              <li>Lite：300円</li>
              <li>Standard：1,000円</li>
              <li>Premium：3,000円</li>
              <li>Special：10,000円</li>
            </ul>
            <p className="mt-2 text-muted-foreground text-xs">
              ※ハイパーチャットチケットは対価のない無償提供のため、上記の販売価格には含まれません。
            </p>
          </TableRow>

          <TableRow label="商品代金以外の必要料金">
            インターネット接続料金、通信料金等はお客様の負担となります。
          </TableRow>

          <TableRow label="お支払い方法">
            クレジットカード決済（Stripe）
          </TableRow>

          {/* 拡張部分 */}
          <TableRow label="代金の支払時期">
            <ul className="space-y-1">
              <li>
                <span className="font-bold">都度課金：</span>
                <br />
                購入手続き時に即時決済が行われます。
              </li>
              <li className="mt-2">
                <span className="font-bold">都度課金（広告掲載等）：</span>
                <br />
                ご請求メール送付後、指定の期日まで（原則3日以内）にお支払いください。
              </li>
              <li className="mt-2">
                <span className="font-bold">定期課金（VCharts Pro等）：</span>
                <br />
                初回お申し込み時に決済が行われます。翌月以降は、毎月同日に自動的に決済が行われます。
              </li>
            </ul>
          </TableRow>

          <TableRow label="商品の引き渡し時期">
            <ul className="space-y-1">
              <li>
                <span className="font-bold">都度課金：</span>
                <br />
                決済完了後、直ちにコメントが掲載されます。
              </li>
              <li className="mt-2">
                <span className="font-bold">都度課金（広告掲載等）：</span>
                <br />
                お支払い確認後、所定の掲載期間開始時にサービスを提供いたします。
              </li>
              <li className="mt-2">
                <span className="font-bold">定期課金：</span>
                <br />
                お支払い手続き完了後、直ちにご利用いただけます。
              </li>
            </ul>
          </TableRow>

          <TableRow label="キャンセル・解約・返金">
            <p className="mb-2">
              デジタルコンテンツの性質上、お客様都合による返品・返金はお受けできません。
            </p>

            <ul className="space-y-2">
              <li>
                <span className="font-bold">ハイパーチャット：</span>
                <br />
                決済完了後のキャンセル・返金はできません。投稿されたコメントが当社の判断により非表示・削除された場合も、返金は行いません。ただし、当方の不備によりサービスが提供されなかった場合は全額返金いたします。
              </li>
              <li>
                <span className="font-bold">広告掲載のキャンセル：</span>
                <br />
                掲載開始後のキャンセル・返金はできません。ただし、当方の不備により掲載が行われなかった場合は全額返金いたします。
              </li>
              <li>
                <span className="font-bold">定期課金の解約：</span>
                <br />
                マイページよりいつでも解約手続きが可能です。次回更新日の前日までに解約手続きを行ってください。
                日割り計算による返金は行われませんが、解約後も契約期間終了日まではサービスをご利用いただけます。
              </li>
            </ul>
          </TableRow>
        </tbody>
      </table>
    </div>
  )
}
