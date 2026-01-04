import { Link } from 'lib/navigation'

export default function TermsOfUseAndPrivacyPolicy() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4 md:px-6 mb-44">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            利用規約およびプライバシーポリシー
          </h1>
          <p className="mt-2 text-muted-foreground">施行日: 2024年7月13日</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold">目次</h2>
          <nav className="mt-4 space-y-2">
            <Link
              href="#terms-of-use"
              className="hover:underline"
              prefetch={false}
            >
              利用規約
            </Link>
            <br />
            <Link
              href="#privacy-policy"
              className="hover:underline"
              prefetch={false}
            >
              プライバシーポリシー
            </Link>
          </nav>
        </div>
        <div>
          <h2 id="terms-of-use" className="text-2xl font-bold">
            利用規約
          </h2>
          <div className="mt-4 space-y-4">
            <p>
              本利用規約（以下「本規約」といいます）は、VCharts（以下「本サービス」といいます）の利用に関する条件を定めるものです。ユーザー（以下「ユーザー」）は、本サービスを利用することにより、本規約に同意したものとみなされます。
            </p>

            <h3 className="text-l font-bold">1. 適用範囲</h3>
            <p>
              本規約は、ユーザーと本サービスの利用に関わるすべての関係に適用されます。また、本サービスにおいて個別に定められた利用規則（以下「個別規定」）も、本規約の一部を構成するものとします。
            </p>

            <h3 className="text-l font-bold">2. 利用条件</h3>
            <p>
              2.1 ユーザーは、本サービスを利用する際に、YouTubeの利用規約（
              <a
                href="https://www.youtube.com/t/terms"
                target="_blank"
                className="underline"
              >
                https://www.youtube.com/t/terms
              </a>
              ）に従うことに同意するものとします。
            </p>
            <p>
              2.2 本サービスは、YouTube Data API
              を使用して情報を提供します。YouTube Data API
              を通じて取得される情報には、YouTube のプライバシーポリシー（
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                className="underline"
              >
                https://policies.google.com/privacy
              </a>
              ）が適用されます。
            </p>

            <h3 className="text-l font-bold">3. プライバシー</h3>
            <p>
              3.1 プライバシーポリシー（
              <Link
                href="#privacy-policy"
                className="hover:underline"
                prefetch={false}
              >
                #privacy-policy
              </Link>
              ）には、ユーザーの情報の収集、使用、共有方法が記載されています。本サービスを利用することで、ユーザーはプライバシーポリシーに同意したものとみなされます。
            </p>

            <h3 className="text-l font-bold">4. 登録</h3>
            <p>
              4.1
              登録希望者が本規約に同意のうえ、当社の定める方法により登録申請を行い、当社がこれを承認することで、登録が完了します。
            </p>
            <p>
              4.2
              登録時には正確かつ完全な情報を提供する必要があります。ユーザーは自身のアカウントの機密性を保持する責任があり、アカウントに関連するすべての活動について責任を負います。不正使用やセキュリティ違反があった場合は、直ちに当社に通知してください。当社は、サービスの提供を拒否し、アカウントを削除・停止し、コンテンツや情報を編集・削除する権利を有します。
            </p>
            <p>
              4.3
              自動化ツールなどを使用して複数のアカウントを作成することは禁止されています。このような行為が発見された場合、関係するすべてのアカウントを事前の通知なく停止（BAN）することがあります。
            </p>

            <h3 className="text-l font-bold">
              5. 応援チケットの有効期限および所持上限
            </h3>
            <p>
              5.1
              ユーザーが本サービスを通じて無償で取得した応援チケットはシーズン終了時にリセットされます。
              ユーザーが本サービスを通じて有償で取得した応援チケットの有効期限は、購入日（もしくは付与日）から起算して1年間とします。
            </p>
            <p>
              5.2
              応援チケット（無償分）には、100枚の所持上限が設けられています。
              所持枚数が上限に達している場合、新たな無償チケット（ログインボーナス等）は付与されず、当該付与を受ける権利も消失します。
              再度付与を受けるためには、チケットを使用し、所持枚数を上限未満にする必要があります。
            </p>
            <p>
              5.3
              有効期限を過ぎた応援チケットは無効となり、いかなる理由によっても再発行・返金は行われません。
            </p>

            <h3 className="text-l font-bold">6. 免責事項</h3>
            <p>
              6.1
              本サービスは「現状有姿」で提供されており、商品性、特定目的への適合性、および非侵害についての黙示的な保証を含む一切の保証を行いません。
            </p>

            <h3 className="text-l font-bold">7. お問い合わせ</h3>
            <p>
              7.1
              本規約に関するお問い合わせは以下のフォームからお願いいたします：{' '}
              <a
                href="https://forms.gle/AtHChW8N4R2NRDbu5"
                target="_blank"
                className="underline"
              >
                Googleフォーム
              </a>
            </p>
          </div>
        </div>
        <div>
          <h2 id="privacy-policy" className="text-2xl font-bold">
            プライバシーポリシー
          </h2>
          <div className="mt-4 space-y-4">
            <p>
              VCharts（以下「本サービス」）は、ユーザーのプライバシーを尊重し、個人情報の保護に努めています。本ポリシーでは、情報の収集、使用、および共有の方法について説明します。
            </p>

            <h3 className="text-l font-bold">1. 情報の収集</h3>
            <div>
              1.1 以下の方法で情報を収集することがあります：
              <ul>
                <li>・名前、メールアドレス、電話番号などの連絡先情報</li>
                <li>・お問い合わせフォームなどから直接提供された情報</li>
                <li>
                  ・サービス利用時に自動で収集される情報（利用状況、デバイス情報など）
                </li>
                <li>
                  ・クッキーや類似技術：本サービスでは、ユーザー体験の向上を目的としてクッキー等を使用することがあります。これにより、デバイスやブラウザを識別し、パーソナライズされたコンテンツを提供します。ブラウザ設定で無効化可能です。
                </li>
              </ul>
            </div>

            <div>
              1.2 本サービスでは、以下のユーザーデータを収集する場合があります：
              <p>
                YouTube Data API を使用して、YouTube
                上で現在ライブ配信中のチャンネル情報などを取得しますが、サービス利用者に関するAPIデータは一切収集、利用、保存していません。
              </p>
              <p>使用するYouTube APIのエンドポイントは以下の通りです：</p>
              <ul>
                <li>・Channels</li>
                <li>・Videos</li>
                <li>・Search</li>
                <li>・PlaylistItems</li>
              </ul>
              <p>取得される主なデータは以下の通りです：</p>
              <p>
                チャンネル・動画のタイトル、説明、サムネイル、登録者数、視聴数、いいね、コメント、ライブ配信予定・頻度
                など。これらの統計をもとに、チャンネルや動画の整理・表示を行います。
              </p>
            </div>

            <div>
              1.3 広告配信について：
              <ul>
                <li>
                  ・Googleなどの第三者配信事業者はクッキーを使用して、ユーザーの過去の訪問履歴に基づいた広告を表示します。
                </li>
                <li>
                  ・広告用クッキーの使用により、ユーザーのサイト訪問履歴などに基づいて適切な広告が配信されます。
                </li>
                <li>
                  ・パーソナライズ広告を無効化するには、以下のページをご確認ください：{' '}
                  <a
                    href="https://www.google.com/settings/ads"
                    target="_blank"
                    className="underline"
                  >
                    Ads Settings
                  </a>{' '}
                  または{' '}
                  <a
                    href="https://www.aboutads.info"
                    target="_blank"
                    className="underline"
                  >
                    www.aboutads.info
                  </a>
                </li>
              </ul>
            </div>

            <h3 className="text-l font-bold">2. 情報の利用</h3>
            <div>
              2.1 収集した情報は以下の目的で使用します：
              <ul>
                <li>・サービスの提供および改善</li>
                <li>・ユーザーサポートの提供</li>
                <li>・法的義務の遵守</li>
                <li>・不正利用の検出および防止</li>
              </ul>
            </div>

            <h3 className="text-l font-bold">3. 情報の共有</h3>
            <div>
              3.1 以下の方法で情報を共有することがあります：
              <ul>
                <li>
                  ・YouTube Data API を通じて取得した情報は YouTube
                  に共有されます
                </li>
                <li>・法令遵守のための開示</li>
                <li>
                  ・サービス提供のために必要な第三者（例：広告パートナー）との共有
                </li>
                <li>
                  ・統計情報や属性情報（例：年齢層、興味カテゴリー、利用傾向など）など、個人を特定できない情報を業務提携先と共有する場合があります。個人が特定可能な情報は、ユーザーの同意を得た場合に限り共有します。提携先とは、目的外利用を禁じる契約を締結した上で、適切に管理されます。
                </li>
              </ul>
            </div>

            <h3 className="text-l font-bold">4. YouTube APIサービスの利用</h3>
            <p>
              4.1 本サービスは YouTube Data API
              を利用しています。これによって取得される情報は、YouTube
              のプライバシーポリシー（
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                className="underline"
              >
                https://policies.google.com/privacy
              </a>
              ）に準拠します。
            </p>

            <h3 className="text-l font-bold">5. 第三者コンテンツプロバイダ</h3>
            <p>
              5.1
              本サービスには、広告など第三者によって提供されるコンテンツが含まれる場合があります。これらの第三者は、サービスを通じてユーザーの情報を収集する可能性があります。
            </p>

            <h3 className="text-l font-bold">6. ユーザーの権利</h3>
            <p>
              6.1
              本サービスが承認済みデータにアクセスしたとユーザーが認識する場合、ユーザーは自身の個人情報の確認、修正、削除を要求する権利があります。以下のGoogleセキュリティ設定ページから権限を取り消すことができます：{' '}
              <a
                href="https://security.google.com/settings/security/permissions"
                target="_blank"
                className="underline break-anywhere"
              >
                https://security.google.com/settings/security/permissions
              </a>
              。
            </p>

            <h3 className="text-l font-bold">7. お問い合わせ</h3>
            <p>
              7.1
              プライバシーポリシーに関するお問い合わせは、以下のフォームからお願いいたします：{' '}
              <a
                href="https://forms.gle/AtHChW8N4R2NRDbu5"
                target="_blank"
                className="underline"
              >
                Googleフォーム
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
