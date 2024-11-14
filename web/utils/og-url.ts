import { getWebUrl } from 'utils/web-url'

/** path starts with / */
export function getOgUrl(path: string) {
  return getWebUrl() + '/api/og' + path
}
