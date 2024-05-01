'use client'

import { Flex } from '@radix-ui/themes'
import { Chat, SideBar, PersonaPanel, ChatContext, useChatContext } from '@/components'

import PersonaModal from '../components/Persona/PersonaModal'
import { Authentication, useAuthContext } from './authenticate'

const ChatPage = () => {
  const provider = useChatContext()
  const authProvider = useAuthContext()
  return (
    <Authentication.Provider value={authProvider}>
      <ChatContext.Provider value={provider}>
        <Flex className="relative chat-flex">
          <SideBar />
          <div className="flex-1 relative">
            <Chat ref={provider.chatRef} />
            <PersonaPanel />
          </div>
        </Flex>
        <PersonaModal />
      </ChatContext.Provider>
    </Authentication.Provider>
  )
}

export default ChatPage
