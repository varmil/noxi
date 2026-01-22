import 'server-only'

const BLOCKLIST_URL =
  'https://raw.githubusercontent.com/disposable-email-domains/disposable-email-domains/main/disposable_email_blocklist.conf'

let blocklist: Set<string> | null = null

async function getBlocklist(): Promise<Set<string>> {
  if (blocklist) return blocklist

  const response = await fetch(BLOCKLIST_URL, {
    next: { revalidate: 604800 } // 1週間キャッシュ
  })
  const text = await response.text()
  blocklist = new Set(text.split('\n').filter(Boolean))
  return blocklist
}

export async function isDisposableEmail(email: string): Promise<boolean> {
  const domain = email.split('@')[1]?.toLowerCase()
  if (!domain) return false

  const list = await getBlocklist()
  return list.has(domain)
}
