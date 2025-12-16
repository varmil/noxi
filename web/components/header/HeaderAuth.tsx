import AuthModalWithButton from 'components/auth/dialog/AuthModalWithButton'
import UserDropdown from 'components/header/UserDropdown'
import { auth } from 'lib/auth'

export default async function HeaderAuth() {
  const session = await auth()

  return (
    <div className="relative ml-auto">
      {session ? <UserDropdown session={session} /> : <AuthModalWithButton />}
    </div>
  )
}
