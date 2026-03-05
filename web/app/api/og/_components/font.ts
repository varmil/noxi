import { getWebUrl } from 'utils/web-url'

export const ogFont = fetch(
  new URL('fonts/NotoSansJP-Bold.otf', getWebUrl())
).then(res => res.arrayBuffer())
