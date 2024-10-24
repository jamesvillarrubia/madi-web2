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
      <ChatContext.Provider value={chatProvider}>
        {children}
      </ChatContext.Provider>
    </Authentication.Provider>
  )
}

export default Contexts
