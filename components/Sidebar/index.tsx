'use client'

import { MdOutlineAdminPanelSettings } from "react-icons/md";

import { Box, Flex, IconButton, ScrollArea, Text } from '@radix-ui/themes'
import React, { useContext } from 'react'
import cs from 'classnames'
import { useRouter } from 'next/navigation'

// import { AiOutlineCloseCircle } from 'react-icons/ai'
import { ChatContext } from '@/components/Chat/context'
// import { FaPlus } from 'react-icons/fa6'
import { FaTheaterMasks } from 'react-icons/fa'

import { SideBarChatList } from '@/components/Chat/components/SideBarChatList.component'

// import '../index.scss'
import { PersonaContext } from '@/components/Persona'

export const SideBar = () => {
  const {
    toggleSidebar,
  } = useContext(ChatContext)

  // const { onOpenPersonaPanel } = useContext(PersonaContext)

  const router = useRouter()
  return (
    <Flex direction="column" className={cs('chart-sider-bar', { show: toggleSidebar })}>
      <Flex className="p-2 h-full overflow-hidden w-64" direction="column" gap="3">
        <SideBarChatList/>
        <Box
          width="auto"
          onClick={() => router.push('/admin')}
          className="bg-token-surface-primary active:scale-95 cursor-pointer"
        >
          <Flex align="center" gap="3">
            <MdOutlineAdminPanelSettings className="inline text-lg"/>
            {/* <FaTheaterMasks className="inline" /> */}
            <Text>Admin Panel</Text>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  )
}

export default SideBar
