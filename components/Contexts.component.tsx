'use client'
import React, { ReactNode } from 'react'

import { ChatContext, useChatContext } from '@/components'
import { MessageContext, useMessageContext } from '@/components'

import { Authentication, useAuthContext, AuthContextType } from './authenticate'
import { ChatContextType, MessageContextType } from '@/components/Chat/context'

interface Props {
  children: ReactNode
}

const Contexts = ({ children }: Props) => {
  const messageProvider: MessageContextType = useMessageContext()
  const chatProvider: ChatContextType = useChatContext()
  const authProvider: AuthContextType = useAuthContext()

  return (
    <Authentication.Provider value={authProvider}>
      <MessageContext.Provider value={messageProvider}>
        <ChatContext.Provider value={chatProvider}>{children}</ChatContext.Provider>
      </MessageContext.Provider>
    </Authentication.Provider>
  )
}

export default Contexts
