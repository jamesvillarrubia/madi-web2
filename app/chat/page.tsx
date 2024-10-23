'use client'

import { Chat, useChatContext } from '@/components'
import { ChatContextType } from '@/components/Chat/context'
import Wrapper from '@/components/Layout/Wrapper.component'
import SideBarChatList from '@/components/Chat/components/SideBarChatList.component'

const ChatPage = () => {
  const chatProvider: ChatContextType = useChatContext()

  return (
    <Wrapper sidebarComponent={<SideBarChatList />}>
      <Chat ref={chatProvider.chatRef} />
    </Wrapper>
  )
}

export default ChatPage