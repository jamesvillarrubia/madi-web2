'use client'

import { Flex } from '@radix-ui/themes'
import { Chat, SideBar, ChatContext, useChatContext } from '@/components'

import { PersonaContext, PersonaPanel, usePersonaContext } from '@/components'

import PersonaModal from '../components/Persona/PersonaModal'
import { Authentication, useAuthContext } from './authenticate'
import { Toaster, Banner } from '@/components'
import { Header } from '@/components/Header/Header'

const ChatPage = () => {
  const chatProvider = useChatContext()
  const authProvider = useAuthContext()
  const personaProvider = usePersonaContext()

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
