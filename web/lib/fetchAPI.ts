export const CACHE_1M = 60
export const CACHE_10M = 600
export const CACHE_1H = 3600
export const CACHE_12H = 3600 * 12
export const CACHE_1D = 86400

export const fetchAPI = async (
  input: string | URL | Request,
  init?: RequestInit
): Promise<Response> => {
  // In local, no-store
  // if (process.env.NODE_ENV === 'development') {
  //   if (!init.next) init.next = {}
  //   init.next.revalidate = undefined
  //   init.cache = 'no-store'
  // }

  // Set default revalidate
  if (!init) init = {}
  if (!init.next) init.next = {}
  init.next.revalidate = CACHE_1M

  return await fetch(process.env.BASE_URL + input, init)
}
