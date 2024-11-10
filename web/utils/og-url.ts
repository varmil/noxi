/** path starts with / */
export function getOgUrl(path: string) {
  const {
    NEXT_PUBLIC_VERCEL_ENV,
    NEXT_PUBLIC_VERCEL_BRANCH_URL,
    NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
  } = process.env

  let URL = ''
  switch (NEXT_PUBLIC_VERCEL_ENV) {
    case 'production':
      URL = `https://${NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ?? ''}`
      break
    case 'preview':
      URL = `https://${NEXT_PUBLIC_VERCEL_BRANCH_URL ?? ''}`
      break
    default:
      URL = 'http://localhost:3000'
  }

  return URL + '/api/og' + path
}
