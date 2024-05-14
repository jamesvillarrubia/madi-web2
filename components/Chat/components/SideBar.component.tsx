'use client'

import { Box, Flex, IconButton, ScrollArea, Text } from '@radix-ui/themes'
import React, { useContext } from 'react'
import cs from 'classnames'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { ChatContext } from '../context/index'
import { FaPlus } from 'react-icons/fa6'
import { FaTheaterMasks } from 'react-icons/fa'
import { Chat } from '../../interface'
import { ChatContextType } from '../context/index'

import '../index.scss'
import { PersonaContext } from '@/components/Persona'

export const SideBar = () => {
  const extra = useContext(ChatContext)
  const {
    currentChatId,
    chatList,
    toggleSidebar,
    onDeleteChat,
    onChangeChat,
    onCreateChat,
    getChatById
  } = extra
  console.log(extra)

  const { DefaultPersonas, onOpenPersonaPanel } = useContext(PersonaContext)


  return (
    <Flex direction="column" className={cs('chart-sider-bar', { show: toggleSidebar })}>
      <Flex className="p-2 h-full overflow-hidden w-64" direction="column" gap="3">
        <Box
          width="auto"
          onClick={() => onCreateChat?.(DefaultPersonas[0])}
          className="bg-token-surface-primary active:scale-95 "
        >
          <FaPlus />
          <Text>New Chat</Text>
        </Box>
        <ScrollArea type="auto" scrollbars="vertical">
          <Flex direction="column" gap="3">
            {chatList.map((id: string) => {
              let chat = getChatById(id) || ({} as Chat)
              if (currentChatId === id) {
                console.log('current Id', currentChatId)
              }
              return (
                <Box
                  key={id}
                  width="auto"
                  className={cs('bg-token-surface active:scale-95 truncate', {
                    active: currentChatId === id
                  })}
                  display="block"
                  onClick={() => {
                    onChangeChat(id)
                    console.log('onClick', id)
                  }}
                >
                  <Text as="p" className="truncate" style={{ maxWidth: 190 }}>
                    {chat?.name || 'FAKE'}
                  </Text>
                  <IconButton
                    size="2"
                    variant="ghost"
                    color="gray"
                    radius="full"
                    onClick={(e) => {
                      e.stopPropagation()
                      onDeleteChat(id)
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
