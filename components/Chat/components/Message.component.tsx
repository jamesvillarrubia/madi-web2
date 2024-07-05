/** AUTO-SUMMARY **
   Purpose: This file defines a React component for rendering individual messages in a chat interface.

   Key Components:
   - `Message`: A React component that displays chat messages.
   - `isJsonString`: A utility function to check if a string is valid JSON.
   - `MessageProps`: TypeScript interface defining the props for the `Message` component.

   Functional Overview: The `Message` component handles the display of chat messages with different roles (user, tool, assistant). It supports collapsible JSON content for messages from tools and integrates markdown rendering for text content. The component also conditionally renders an `ActionBubble` for messages from the assistant.

   Dependencies and Integrations: 
   - Uses `@radix-ui/react-collapsible` for collapsible functionality.
   - Integrates with `Avatar` from `@radix-ui/themes` for user icons.
   - Utilizes `FaAngleDown`, `FaAngleUp` from `react-icons/fa` and `HiUser`, `SiOpenai` from `react-icons/hi` for icons.
   - Relies on the `Markdown` and `ActionBubble` components for content formatting and additional interactive elements.
   - Imports `ChatMessage` interface from a higher-level directory for type consistency.

   Additional Context: The component is designed to be flexible, supporting different message types and content formats, enhancing the user experience in chat applications by providing visually distinct and interactive message displays.
*** END-SUMMARY **/
'use client'

import * as Collapsible from '@radix-ui/react-collapsible'
import { Avatar, Flex } from '@radix-ui/themes'
import { useState } from 'react'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'
import { HiUser } from 'react-icons/hi'
import { SiOpenai } from 'react-icons/si'
import { ChatMessage } from '../../interface'
import { ActionBubble } from './ActionBubble'
import { Markdown } from './Markdown'

export interface MessageProps {
  message: ChatMessage
  index: number
}
function isJsonString(str: string) {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}
const Message = (props: MessageProps) => {
  // const { currentChat } = useContext(ChatContext)
  const { role, content, name } = props.message
  const isUser = role === 'user'
  const [open, setOpen] = useState(false)
  const messageIndex = props.index

  if (content) {
    if (role === 'tool' && isJsonString(content)) {
      return (
        <Flex gap="4" className="-mt-5 mb-5 ml-20 text-xs	" style={{ color: 'var(--accent-a10)' }}>
          <Collapsible.Root className="CollapsibleRoot" open={open} onOpenChange={setOpen}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Collapsible.Trigger asChild className="mr-3 text-md">
                <button className="IconButton">{open ? <FaAngleUp /> : <FaAngleDown />}</button>
              </Collapsible.Trigger>
              <span>Tool: {name}</span>
            </div>
            <Collapsible.Content>
              <pre
                style={{
                  whiteSpace: 'pre-wrap' /* Since CSS 2.1 */,
                  wordWrap: 'break-word' /* Internet Explorer 5.5+ */
                }}
              >
                {JSON.stringify(JSON.parse(content), null, 2)}
              </pre>
            </Collapsible.Content>
          </Collapsible.Root>
        </Flex>
      )
    }
    return (
      <Flex gap="4" className={`mb-5 ${isUser ? 'justify-end' : ''}`}>
        {!isUser ? (
          <Avatar
            fallback={isUser ? <HiUser className="h-4 w-4" /> : <SiOpenai className="h-4 w-4" />}
            color={isUser ? undefined : 'green'}
            size="3"
            radius="full"
          />
        ) : null}
        <Flex
          direction="column"
          gap="2"
          className={`py-1 px-3 flex-1 break-word rounded-lg role-${role}`}
          style={{
            backgroundColor: isUser ? 'var(--gray-a4)' : '',
            maxWidth: '90%',
            alignSelf: 'flex-end',
            textAlign: 'left',
            flex: 'none'
          }}
        >
          <Markdown>{content}</Markdown>
          {role === 'assistant' ? (
            <ActionBubble message={content} index={messageIndex} />
          ) : undefined}
        </Flex>
      </Flex>
    )
  }
}

export default Message
