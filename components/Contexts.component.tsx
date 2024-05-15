'use client'
import React, { ReactNode } from 'react';

import { ChatContext, useChatContext } from '@/components'

import { Authentication, useAuthContext, AuthContextType } from './authenticate'
import { ChatContextType } from '@/components/Chat/context'


import { PersonaContextType, PersonaContext, PersonaPanel, usePersonaContext, PersonaModal  } from '@/components/Persona'

import { AdminContextType, AdminContext, useAdminContext, AdminPanel } from '@/components/Admin'

interface Props {
  children: ReactNode;
}

const Contexts = ({children}:Props)=>{
  const chatProvider: ChatContextType = useChatContext()
  const authProvider: AuthContextType = useAuthContext()
  const personaProvider: PersonaContextType = usePersonaContext()
  const adminProvider: AdminContextType = useAdminContext()

  return (
    <Authentication.Provider value={authProvider}>
      <ChatContext.Provider value={chatProvider}>
        <PersonaContext.Provider value={personaProvider}>
          <AdminContext.Provider value={adminProvider}>
            {children}
          </AdminContext.Provider>
        </PersonaContext.Provider>
      </ChatContext.Provider>
    </Authentication.Provider>
  )
}

export default Contexts
