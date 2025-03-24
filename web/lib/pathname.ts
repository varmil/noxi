/**
 * Extract the locale and normalize the pathname
 */
export function normalizePathname(pathname: string): string {
  const parts = pathname.split('/')
  if (parts.length > 1 && /^[a-z]{2}(?:-[A-Z]{2})?$/.test(parts[1])) {
    // Remove the locale part if it exists (e.g., /ja or /en-US)
    parts.splice(1, 1)
  }
  return parts.join('/')
}
