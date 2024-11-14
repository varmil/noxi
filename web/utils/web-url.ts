export function getWebUrl() {
  const { VERCEL_ENV, VERCEL_BRANCH_URL, VERCEL_PROJECT_PRODUCTION_URL } =
    process.env

  let URL = ''
  switch (VERCEL_ENV) {
    case 'production':
      URL = `https://${VERCEL_PROJECT_PRODUCTION_URL ?? ''}`
      break
    case 'preview':
      URL = `https://${VERCEL_BRANCH_URL ?? ''}`
      break
    default:
      URL = 'http://localhost:3000'
  }

  return URL
}
