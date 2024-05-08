'use client'

import { Box, Flex, IconButton, ScrollArea, Text } from '@radix-ui/themes'
import React, { useContext } from 'react'
import cs from 'classnames'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { ChatContext } from '../chat.context'
import { FaPlus } from 'react-icons/fa6'
import { FaTheaterMasks } from 'react-icons/fa'

import '../chat.scss'

export const SideBar = () => {
  const {
    currentChat,
    chatList,
    DefaultPersonas,
    toggleSidebar,
    onDeleteChat,
    onChangeChat,
    onCreateChat,
    onOpenPersonaPanel
  } = useContext(ChatContext)

  return (
    <Flex direction="column" className={cs('chart-sider-bar', { show: toggleSidebar })}>
      <Flex className="p-2 h-full overflow-hidden w-64" direction="column" gap="3">
        <Box
          width="auto"
          onClick={() => onCreateChat?.(DefaultPersonas[0])}
          className="bg-token-surface-primary active:scale-95 "
        >
          {/* <SiOpenai className="h-5 w-5" /> */}
          <FaPlus />
          <Text>New Chat</Text>
        </Box>
        <ScrollArea className="flex-1" type="auto" scrollbars="vertical">
          <Flex direction="column" gap="3">
            {chatList.map((chat) => {
              return (
                <Box
                  key={chat.id}
                  width="auto"
                  className={cs('bg-token-surface active:scale-95 truncate', {
                    active: currentChat?.id === chat.id
                  })}
                  onClick={() => {
                    console.log('clicked new chat', chat)
                    onChangeChat?.(chat)
                  }}
                >
                  <Text as="p" className="truncate">
                    {chat?.name || chat.persona?.name}
                  </Text>
                  <IconButton
                    size="2"
                    variant="ghost"
                    color="gray"
                    radius="full"
                    onClick={(e) => {
                      e.stopPropagation()
                      onDeleteChat?.(chat)
                    }}
                  >
                    <AiOutlineCloseCircle className="h-4 w-4" />
                  </IconButton>
                </Box>
              )
            })}
          </Flex>
        </ScrollArea>
        <Box
          width="auto"
          onClick={() => onOpenPersonaPanel?.('chat')}
          className="bg-token-surface-primary active:scale-95 "
        >
          <Flex align="center" gap="3">
            <FaTheaterMasks className="inline" />
            <Text>System Personas</Text>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  )
}

export default SideBar
