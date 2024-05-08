// authenticate.tsx
'use client'
import { createContext, useState, useEffect, useContext } from 'react'
import { API_HOST, GCP_IAP_HEADERS } from '../constants'
import { User } from '../components/interface'
import { LoginPage } from '@/app/login/page'

export const Authentication = createContext<{
  currentUser?: User
  authenticateUser: () => void
}>({
  currentUser: undefined,
  authenticateUser: () => {}
})

export const useAuthContext = () => {
  return useContext(Authentication)
}

export const AuthenticationProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)

  const authenticateUser = async () => {
    try {
      // const url = `${API_HOST}/users`
      const url = `${API_HOST}/oauth`
      
      // const url = `https://dev.casmadi.app/api/users`
      const res = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'GET',
        redirect: 'manual', // Change the redirect mode to 'manual'
      });

      if (res.status === 302) {
        // Redirect to the Google OAuth authentication URL
        const authUrl = res.headers.get('location');
        if (authUrl) {
          // Open the Google OAuth flow in a new window or redirect the current window
          window.open(authUrl, '_blank');
          // or
          // window.location.href = authUrl;
        } else {
          console.error('Authentication URL not found');
        }
      } else if (res.ok) {
        const json = await res.json();
        if (json.data) {
          console.log('res', res);
          setCurrentUser(json.data[0]);
        }
        console.log('USER', json);
      } else {
        console.error('Authentication failed');
      }
    } catch (error) {
      console.error('Error during authentication:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    authenticateUser()
  }, [])

  if (isLoading) {
    return null // or you can render a loading state
  }

  return (
    <Authentication.Provider value={{ currentUser, authenticateUser }}>
      {currentUser ? children : <LoginPage />}
    </Authentication.Provider>
  )
}