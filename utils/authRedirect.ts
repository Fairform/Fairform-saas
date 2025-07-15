import { User, Session } from '@supabase/supabase-js'

export const handleAuthenticatedAction = (
  user: User | null, 
  session: Session | null, 
  onAuthenticated: () => void,
  redirectPath: string = '/login'
) => {
  if (!user || !session) {
    window.location.href = redirectPath
    return false
  }
  onAuthenticated()
  return true
}
