'use client'

import { Flex } from '@radix-ui/themes'
import { Chat, SideBar, ChatContext, useChatContext } from '@/components'

import { Authentication, useAuthContext, AuthContextType } from './authenticate'
import { Toaster, Banner } from '@/components'
import { Header } from '@/components/Header/Header'
import { ChatContextType } from '@/components/Chat/context'


import { PersonaContextType, PersonaContext, PersonaPanel, usePersonaContext, PersonaModal  } from '@/components/Persona'

import { AdminContextType, AdminContext, useAdminContext, AdminPanel } from '@/components/Admin'



const ChatPage = () => {
  const chatProvider: ChatContextType = useChatContext()
  const authProvider: AuthContextType = useAuthContext()
  const personaProvider: PersonaContextType = usePersonaContext()
  const adminProvider: AdminContextType = useAdminContext()

  return (
    <Authentication.Provider value={authProvider}>
      <ChatContext.Provider value={chatProvider}>
        <PersonaContext.Provider value={personaProvider}>
          <AdminContext.Provider value={adminProvider}>
          <Banner />
          <Header />
          <Flex className="relative chat-flex">
            <SideBar />
            <div className="flex-1 relative">
              <Chat ref={chatProvider.chatRef} />
              <PersonaPanel />
              <AdminPanel />
            </div>
          </Flex>
          <PersonaModal />
          <Toaster />
          </AdminContext.Provider>
        </PersonaContext.Provider>
      </ChatContext.Provider>
    </Authentication.Provider>
  )
}

export default ChatPage
