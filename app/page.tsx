'use client'

import { Flex } from '@radix-ui/themes'
import { Chat, SideBar, PersonaPanel, ChatContext, useChatContext } from '@/components'

import PersonaModal from './chat/PersonaModal'

const ChatPage = () => {
  const provider = useChatContext()

  return (
    <ChatContext.Provider value={provider}>
      <Flex style={{ height: 'calc(100% - 56px)' }} className="relative">
        <SideBar />
        <div className="flex-1 relative">
          <Chat ref={provider.chatRef} />
          <PersonaPanel />
        </div>
      </Flex>
      <PersonaModal />
    </ChatContext.Provider>
  )
}

export default ChatPage
