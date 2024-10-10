'use client'
import { Chat } from '@/components'
import { useChatContext } from '@/components'
import { ChatContextType } from '@/components/Chat/context'

import Wrapper from '@/components/Wrapper.component'
import Contexts from '@/components/Contexts.component'
import SideBarChatList from '@/components/Chat/components/SideBarChatList.component'

const ChatPage = () => {
  const chatProvider: ChatContextType = useChatContext()

  return (
    <Contexts>
      <Wrapper sidebarComponent={<SideBarChatList/>}>
        <Chat ref={chatProvider.chatRef} />
      </Wrapper>
    </Contexts>
  )
}

export default ChatPage
