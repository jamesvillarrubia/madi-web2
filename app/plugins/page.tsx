'use client'
import { Chat } from '@/components'
import { useChatContext } from '@/components'
import { ChatContextType } from '@/components/Chat/context'

import Wrapper from '@/components/Wrapper.component'
import Contexts from '@/components/Contexts.component'
import SideBarChatList from '@/components/Chat/components/SideBarChatList.component'
import { PluginList } from '@/components/Tools/PluginList'
const PluginsPage = () => {
  const chatProvider: ChatContextType = useChatContext()

  return (
    <Contexts>
      <Wrapper sidebarComponent={<SideBarChatList/>}>
        <PluginList/>
      </Wrapper>
    </Contexts>
  )
}

export default PluginsPage
