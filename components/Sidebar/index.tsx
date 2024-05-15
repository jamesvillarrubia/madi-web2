'use client'

import { MdOutlineAdminPanelSettings } from "react-icons/md";

import { Box, Flex, IconButton, ScrollArea, Text } from '@radix-ui/themes'
import React, { useContext } from 'react'
import cs from 'classnames'
import { useRouter } from 'next/navigation'

import { ChatContext } from '@/components/Chat/context'

import { SideBarChatList } from '@/components/Chat/components/SideBarChatList.component'

export const SideBar = () => {
  const {
    toggleSidebar,
  } = useContext(ChatContext)

  const router = useRouter()
  return (
    <Flex direction="column" className={cs('chart-sider-bar', { show: toggleSidebar })}>
      <Flex className="p-2 h-full overflow-hidden w-64" direction="column" gap="3">
        <SideBarChatList/>
      </Flex>
    </Flex>
  )
}

export default SideBar
