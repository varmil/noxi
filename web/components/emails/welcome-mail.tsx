import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text
} from '@react-email/components'
import { getWebUrl } from 'utils/web-url'

interface WelcomeEmailProps {
  username: string
  userEmail?: string | null
}

export const WelcomeEmail = ({ username, userEmail }: WelcomeEmailProps) => {
  const baseUrl = getWebUrl()

  return (
    <Html>
      <Head />
      <Preview>PeakXへようこそ！新規登録が完了しました。</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`${baseUrl}/peakx/icon.png`}
            width="48"
            height="48"
            alt="PeakX"
            style={logo}
          />
          <Heading style={heading}>PeakXへようこそ！</Heading>
          <Section style={section}>
            <Text style={text}>{username}様、</Text>
            <Text style={text}>
              PeakXへのご登録ありがとうございます。あなたのアカウントが正常に作成されました。
              あなたの応援をより価値あるものに、そして応援の力によってタレントの成長を加速します。
            </Text>
            {userEmail && (
              <>
                <Text style={text}>アカウント情報：</Text>
                <Text style={accountInfo}>メールアドレス: {userEmail}</Text>
              </>
            )}
          </Section>
          <Section style={buttonContainer}>
            <Button style={button} href={`${baseUrl}/ja/dashboard`}>
              ダッシュボードへ
            </Button>
          </Section>
          <Section style={section}>
            <Text style={text}>PeakXでは以下のことができます：</Text>
            <ul style={list}>
              <li style={listItem}>応援チケットを獲得する</li>
              <li style={listItem}>応援チケットを購入する（年内予定）</li>
              <li style={listItem}>タレントを応援する</li>
              <li style={listItem}>ランキングで活躍を見守る</li>
            </ul>
            <Text style={text}>
              機能の使い方やサービスについてご不明な点がございましたら、お気軽にサポートチームまでお問い合わせください。
            </Text>
          </Section>
          <Hr style={hr} />
          <Section>
            <Text style={footer}>© 2025 PeakX, Inc. All rights reserved.</Text>
            {/* <Text style={footer}>〒100-0001 東京都千代田区1-1-1</Text> */}
            <Text style={footer}>support@peakx.net</Text>
            <Text style={footer}>
              <Link
                href="https://www.vcharts.net/ja/terms-of-use-and-privacy-policy"
                style={link}
              >
                プライバシーポリシー
              </Link>{' '}
              ・
              <Link
                href="https://www.vcharts.net/ja/terms-of-use-and-privacy-policy"
                style={link}
              >
                利用規約
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default WelcomeEmail

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif'
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  borderRadius: '5px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
}

const logo = {
  margin: '0 auto',
  marginBottom: '16px'
}

const heading = {
  fontSize: '24px',
  letterSpacing: '-0.5px',
  lineHeight: '1.3',
  fontWeight: '700',
  color: '#484848',
  textAlign: 'center' as const
}

const section = {
  padding: '0 48px'
}

const text = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#484848'
}

const accountInfo = {
  fontSize: '14px',
  lineHeight: '24px',
  color: '#687087',
  marginBottom: '16px'
}

const buttonContainer = {
  padding: '24px 0',
  textAlign: 'center' as const
}

const button = {
  backgroundColor: '#fcac00',
  borderRadius: '4px',
  color: '#000',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  padding: '12px 24px'
}

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0'
}

const list = {
  paddingLeft: '24px',
  margin: '16px 0'
}

const listItem = {
  fontSize: '16px',
  lineHeight: '24px',
  color: '#484848',
  marginBottom: '8px'
}

const footer = {
  color: '#9ca299',
  fontSize: '14px',
  lineHeight: '24px',
  textAlign: 'center' as const,
  marginBottom: '4px'
}

const link = {
  color: '#9ca299',
  textDecoration: 'underline'
}
