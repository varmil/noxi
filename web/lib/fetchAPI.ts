export const fetchAPI = async (
  input: string | URL | Request,
  init?: RequestInit
): Promise<Response> => {
  // In local, no-store
  if (process.env.NODE_ENV === 'development') {
    if (!init) init = {}
    if (!init.next) init.next = {}
    init.next.revalidate = undefined
    init.cache = 'no-store'
  }

  return await fetch(process.env.BASE_URL + input, init)
}
