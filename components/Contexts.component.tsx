/** AUTO-SUMMARY **
   Purpose: This file is responsible for wrapping child components in necessary context providers for authentication and chat functionalities within a React application.

   Key Components:
   - `Contexts` component: A React component that uses context providers for chat and authentication.
   - `ChatContext` and `Authentication`: Context providers imported from other parts of the project.

   Functional Overview: The `Contexts` component integrates chat and authentication contexts, providing these functionalities to all child components nested within it. This setup ensures that any child component can access chat and authentication data and functions through the React context API.

   Dependencies and Integrations: 
   - Uses `ChatContext` and `useChatContext` from `@/components`.
   - Uses `Authentication`, `useAuthContext`, and `AuthContextType` from the local `authenticate` module.
   - Relies on React's context mechanism to pass down chat and authentication data.

   Additional Context: This component is crucial for maintaining a clean and manageable structure in the application by centralizing context providers, which helps in avoiding prop drilling and makes the state management easier across the application.
*** END-SUMMARY **/
'use client'
import React, { ReactNode } from 'react'

import { ChatContext, useChatContext } from '@/components'

import { Authentication, useAuthContext, AuthContextType } from './authenticate'
import { ChatContextType } from '@/components/Chat/context'

interface Props {
  children: ReactNode
}

const Contexts = ({ children }: Props) => {
  const chatProvider: ChatContextType = useChatContext()
  const authProvider: AuthContextType = useAuthContext()

  return (
    <Authentication.Provider value={authProvider}>
      <ChatContext.Provider value={chatProvider}>{children}</ChatContext.Provider>
    </Authentication.Provider>
  )
}

export default Contexts
