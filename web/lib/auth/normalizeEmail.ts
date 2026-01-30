/**
 * メールアドレスを正規化する
 *
 * - 全ドメイン共通: 小文字化、+ 以降を除去
 * - Gmail/Googlemail のみ: ドット除去、ドメインを gmail.com に統一
 *
 * @example
 * normalizeEmail('Test+alias@Gmail.com') // => 'test@gmail.com'
 * normalizeEmail('t.e.s.t@gmail.com')    // => 'test@gmail.com'
 * normalizeEmail('user+tag@outlook.com') // => 'user@outlook.com'
 * normalizeEmail('user.name@outlook.com') // => 'user.name@outlook.com'
 */
export function normalizeEmail(email: string): string {
  const [localPart, domain] = email.toLowerCase().split('@')

  if (!localPart || !domain) {
    return email.toLowerCase()
  }

  // + 以降を除去（全ドメイン共通）
  let normalizedLocal = localPart.split('+')[0]

  // Gmail/Googlemail のみ: ドット除去、ドメイン統一
  if (domain === 'gmail.com' || domain === 'googlemail.com') {
    normalizedLocal = normalizedLocal.replace(/\./g, '')
    return `${normalizedLocal}@gmail.com`
  }

  return `${normalizedLocal}@${domain}`
}
