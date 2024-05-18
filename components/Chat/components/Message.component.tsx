'use client'

import { useContext, useState } from 'react'
import { Avatar, Flex } from '@radix-ui/themes'
import { SiOpenai } from 'react-icons/si'
import { HiUser } from 'react-icons/hi'
import { Markdown } from './Markdown'
import { ChatMessage } from '../../interface'
import * as Collapsible from '@radix-ui/react-collapsible'
import { FaAngleDown } from 'react-icons/fa'
import { FaAngleUp } from 'react-icons/fa'
import { ActionBubble } from './ActionBubble'

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
      <Flex gap="4" className="mb-5">
        <Avatar
          fallback={isUser ? <HiUser className="h-4 w-4" /> : <SiOpenai className="h-4 w-4" />}
          color={isUser ? undefined : 'green'}
          size="3"
          radius="full"
        />
        <Flex
          direction="column"
          gap="2"
          className={`py-1 px-3 flex-1 break-word rounded-lg role-${role}`}
          // style={{backgroundColor:`var(--gray-a2)`}}
        >
          <Markdown>{content}</Markdown>
          {role === 'assistant' ? <ActionBubble message={content} index={messageIndex} /> : undefined}
        </Flex>
      </Flex>
    )
  }
}

export default Message
