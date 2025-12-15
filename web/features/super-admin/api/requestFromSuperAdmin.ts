import axios from 'axios'

type Data = {
  httpMethod?: string
  url?: string
  body?: string
  headers?: string
}

export async function requestFromSuperAdmin({
  httpMethod,
  url,
  body,
  headers
}: Data) {
  try {
    const res = await axios.request({
      url,
      method: httpMethod,
      headers: headers ? JSON.parse(headers) : undefined,
      params: body ? JSON.parse(body) : undefined
    })

    return res.data
  } catch {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to retuest')
  }
}
