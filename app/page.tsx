'use client'

import { Flex } from '@radix-ui/themes'
import { Chat, SideBar, ChatContext, useChatContext } from '@/components'

import { PersonaContext, PersonaPanel, usePersonaContext } from '@/components'

import PersonaModal from '../components/Persona/PersonaModal'
import { Authentication, useAuthContext, AuthContextType } from './authenticate'
import { Toaster, Banner } from '@/components'
import { Header } from '@/components/Header/Header'
import { ChatContextType } from '@/components/Chat/context'
import { PersonaContextType } from '@/components/Persona/persona.context'

const ChatPage = () => {
  const chatProvider:ChatContextType = useChatContext()
  const authProvider:AuthContextType = useAuthContext()
  const personaProvider:PersonaContextType = usePersonaContext()

  return (
    <Authentication.Provider value={authProvider}>
      <ChatContext.Provider value={chatProvider}>
        <PersonaContext.Provider value={personaProvider}>
          <Banner />
          <Header />
          <Flex className="relative chat-flex">
            <SideBar />
            <div className="flex-1 relative">
              <Chat ref={chatProvider.chatRef} />
              <PersonaPanel />
            </div>
          </Flex>
          <PersonaModal />
          <Toaster />
        </PersonaContext.Provider>
      </ChatContext.Provider>
    </Authentication.Provider>
  )
}

export default ChatPage
