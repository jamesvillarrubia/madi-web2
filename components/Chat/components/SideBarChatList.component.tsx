/** AUTO-SUMMARY **
   Purpose: This file defines a React component for rendering a sidebar that lists chat conversations in the application.

   Key Components:
   - `SideBarChatList`: The main React functional component.
   - `ChatContext`: Context used to manage and access chat-related data and functions.
   - `DefaultPersonas`: A constant used to provide default values when creating new chats.

   Functional Overview: The `SideBarChatList` component displays a list of chat conversations. It allows users to create a new chat, switch between different chats, and delete existing chats. The component uses a `ScrollArea` for scrolling through the list and `IconButton` components for interactive elements like deleting a chat.

   Dependencies and Integrations: 
   - Uses `ChatContext` for accessing and manipulating chat data such as the current chat ID, chat list, and functions like `onDeleteChat`, `onChangeChat`, `onCreateChat`, and `getChatById`.
   - Integrates with Radix UI components (`Box`, `Flex`, `IconButton`, `ScrollArea`, `Text`) for layout and styling.
   - Imports icons from `react-icons` for visual elements in the UI.

   Additional Context: The component is styled using classes defined in `index.scss` and utilizes conditional rendering and event handling to manage chat interactions. The use of `useContext` hook indicates reliance on React's Context API for state management, promoting easier state management across the component tree.
*** END-SUMMARY **/
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
  const {
    currentChatId,
    chatList,
    onDeleteChat,
    onChangeChat,
    onCreateChat,
    getChatById
  } = useContext(ChatContext)

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
