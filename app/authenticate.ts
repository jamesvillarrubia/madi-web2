import { createContext, useState, useEffect } from 'react'
import { API_HOST, GCP_IAP_HEADERS } from '../constants'
import { User } from '../components/interface'

export type AuthContextType = {
  currentUser?: User
  authenticateUser: () => void
}

export const Authentication = createContext<AuthContextType>(undefined as unknown as AuthContextType)


export const useAuthContext = () => {
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined)

  const authenticateUser = async () => {
    try {
      const url = `${API_HOST}/users`
      let res = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...GCP_IAP_HEADERS
        },
        method: 'GET'
      })

      if (!res.ok && res.status === 401) {
        // Unauthorized, posting an empty object
        res = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            ...GCP_IAP_HEADERS
          },
          method: 'POST',
          body: JSON.stringify({
            email: 'example@example.com',
            googleId: '123456890'
          })
        })
      }

      const json = await res.json()
      if (json.data) {
        console.log('res', res)
        setCurrentUser(json.data)
      }
    } catch (error) {
      console.error('Error during authentication:', error)
    }
  }

  useEffect(() => {
    authenticateUser()
  }, [])

  return { currentUser, authenticateUser }
}

export default Authentication
