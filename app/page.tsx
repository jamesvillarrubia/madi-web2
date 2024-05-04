'use client'

import { Flex } from '@radix-ui/themes'
import { Chat, SideBar, PersonaPanel, ChatContext, useChatContext } from '@/components'

import PersonaModal from '../components/Persona/PersonaModal'
import { Authentication, useAuthContext } from './authenticate'
import { Toaster, Banner } from '@/components'
import { Header } from '@/components/Header/Header'

const ChatPage = () => {
  const provider = useChatContext()
  const authProvider = useAuthContext()

  return (
    <Authentication.Provider value={authProvider}>
      <ChatContext.Provider value={provider}>
          <Banner />
          <Header />
          <Flex className="relative chat-flex">
            <SideBar />
            <div className="flex-1 relative">
              <Chat ref={provider.chatRef} />
              <PersonaPanel />
            </div>
          </Flex>
          <PersonaModal />
          <Toaster />
      </ChatContext.Provider>
    </Authentication.Provider>
  )
}

export default ChatPage
