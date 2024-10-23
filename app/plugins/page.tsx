'use client'
import Wrapper from '@/components/Layout/Wrapper.component'
import SideBarChatList from '@/components/Chat/components/SideBarChatList.component'
import { PluginList } from '@/components/Tools/PluginList'

const PluginsPage = () => {
  
  return (
    <Wrapper sidebarComponent={<SideBarChatList />}>
      <PluginList />
    </Wrapper>
  )
}

export default PluginsPage