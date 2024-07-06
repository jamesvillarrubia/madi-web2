'use client'

import { Box, Flex, IconButton, ScrollArea, Text } from '@radix-ui/themes'
import cs from 'classnames'
import { useContext } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { FaPlus } from 'react-icons/fa6'
import { Chat } from '../../interface'
import { ChatContext, DefaultPersonas } from '../context/index'

import '../index.scss'

export const SideBarChatList = () => {
  const { currentChatId, chatList, onDeleteChat, onChangeChat, onCreateChat, getChatById } =
    useContext(ChatContext)

  return (
    <>
      <Box
        width="auto"
        onClick={() => onCreateChat(DefaultPersonas[0])}
        className="bg-token-surface-primary active:scale-95 cursor-pointer"
      >
        <FaPlus />
        <Text>New Chat</Text>
      </Box>
      <ScrollArea type="auto" scrollbars="vertical">
        <Flex direction="column" gap="3">
          {chatList.map((id: string) => {
            // console.log(chatList, id)
            const chat = getChatById(id) || ({} as Chat)
            if (!chat.name) {
              return null
            }
            return (
              <Box
                key={id}
                width="auto"
                className={cs('bg-token-surface active:scale-95 truncate cursor-pointer', {
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
    </>
  )
}

export default SideBarChatList
