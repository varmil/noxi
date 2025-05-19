import { ReservedUsernames } from './ReservedUsernames'

export const isUsernameReserved = (username: string) => {
  const lowerInput = username.toLowerCase()
  return Array.from(ReservedUsernames).some(reservedUsername =>
    lowerInput.includes(reservedUsername)
  )
}
