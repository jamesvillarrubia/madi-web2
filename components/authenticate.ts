/** AUTO-SUMMARY **
   Purpose: This file provides authentication management functionalities using React context for the project.

   Key Components:
   - `AuthContextType`: Type definition for the authentication context.
   - `Authentication`: React context for authentication.
   - `useAuthContext`: Custom React hook for accessing and managing the authentication state.

   Functional Overview: The file defines a React context to handle user authentication, including fetching user data from an API and updating the authentication state. It includes a custom hook (`useAuthContext`) that encapsulates the logic for authenticating a user and managing the current user state.

   Dependencies and Integrations: 
   - React's `useState` and `useEffect` hooks are used for state management and side effects.
   - Constants `API_HOST` and `GCP_IAP_HEADERS` are imported from a constants module, indicating integration with configuration settings and possibly Google Cloud Platform's Identity-Aware Proxy.
   - The `User` type is imported from a components interface module, suggesting integration with other UI components.

   Additional Context: The authentication process attempts to fetch user data and handles unauthorized access by posting default credentials to potentially register or re-authenticate. This setup indicates a system designed to handle both initial authentication and re-authentication flows seamlessly.
*** END-SUMMARY **/
import { createContext, useState, useEffect } from 'react'
import { API_HOST, GCP_IAP_HEADERS } from '../constants'
import { User } from '../components/interface'

export type AuthContextType = {
  currentUser?: User
  authenticateUser: () => void
}

export const Authentication = createContext<AuthContextType>(
  undefined as unknown as AuthContextType
)

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
