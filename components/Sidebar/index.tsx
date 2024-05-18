'use client'

import { Box, Flex, Text } from '@radix-ui/themes'
import { QuestionMarkIcon } from '@radix-ui/react-icons'
import { SlSupport } from "react-icons/sl";
import React, { useContext } from 'react'
import cs from 'classnames'

import { ChatContext } from '@/components/Chat/context'
import { SideBarChatList } from '@/components/Chat/components/SideBarChatList.component'

/**
 * SideBar component that displays the chat list and support button.
 * @returns {JSX.Element} The rendered sidebar component.
 */
export const SideBar = () => {
  const { toggleSidebar } = useContext(ChatContext)

  return (
    <Flex direction="column" className={cs('chart-sider-bar', { show: toggleSidebar })}>
      <Flex className="p-2 pb-4 h-full overflow-hidden w-64" direction="column" gap="3">
        <SideBarChatList />
        <SupportButton />
      </Flex>
    </Flex>
  )
}

export default SideBar

/**
 * SupportButton component that opens the default mail client when clicked.
 * @returns {JSX.Element} The rendered support button component.
 */
export const SupportButton = () => {
  return (
    <Box
      width="auto"
      className="bg-token-surface-primary active:scale-95 cursor-pointer"
      onClick={() => window.open('mailto:hq-dl-madi@mail.nasa.gov', '_blank')}
    >
      <SlSupport />
      <Text>Support</Text>
    </Box>
  )
}

/**
 * FAQButton component that displays a FAQs button.
 * @returns {JSX.Element} The rendered FAQ button component.
 */
export const FAQButton = () => {
  return (
    <Box
      width="auto"
      className="bg-token-surface-primary active:scale-95 cursor-pointer"
    >
      <QuestionMarkIcon />
      <Text>FAQs</Text>
    </Box>
  )
}