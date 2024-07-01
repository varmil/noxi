export const fetchAPI = async (
  input: string | URL | Request,
  init?: RequestInit
): Promise<Response> => {
  return await fetch(process.env.BASE_URL + input, init)
}
